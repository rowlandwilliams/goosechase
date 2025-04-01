import AWS from 'aws-sdk';
import { S3Client, GetObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { type Page } from 'puppeteer';
import { db } from '@/server/db';

export const s3Client = new S3Client({
    region: 'eu-west-2',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

export const s3 = new AWS.S3();
export const bucketName = process.env.BUCKET_NAME ?? '';

export const generateSignedUrl = async (
    bucketName: string,
    objectKey: string,
    expiresInSeconds = 3600
): Promise<string> => {
    // Check that the S3 client and bucketName are correctly initialized
    if (!s3 || !bucketName || !objectKey) {
        console.error('Invalid parameters:', { s3, bucketName, objectKey });
        throw new Error('S3 client or parameters are missing');
    }

    const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: objectKey,
    });

    try {
        const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: expiresInSeconds });

        return signedUrl;
    } catch (error) {
        console.error('Error generating signed URL:', error);
        throw new Error('Error generating signed URL');
    }
};

export const getSessionScreenshotUrls = async ({ surfSessionId }: { surfSessionId: string }) => {
    const screenshotsBySurfSessionId = await db.surfSessionScreenshot.findMany({
        where: { surfSessionId },
        select: { id: true }, // We only need the ID (used in filename)
    });

    if (!screenshotsBySurfSessionId.length) return { urls: [] };

    const params = { Bucket: bucketName };
    const command = new ListObjectsV2Command(params);
    const data = await s3Client.send(command);

    if (!data.Contents) return { urls: [] };

    const screenshotIds = new Set(screenshotsBySurfSessionId.map((s) => s.id));

    const matchingObjects = data.Contents.filter((item) => {
        return item.Key && screenshotIds.has(item.Key.replace('screenshot-', '').replace('.png', ''));
    });

    const urlsPromises = matchingObjects.map(async (item) => {
        return item.Key ? await generateSignedUrl(bucketName, item.Key) : '';
    });

    const urls = (await Promise.all(urlsPromises)).filter((url) => url);

    return { urls };
};

export const createSurfSessionScreenshot = async ({
    page,
    spotName,
    surfSessionId,
}: {
    page: Page;
    spotName: string;
    surfSessionId: string;
}) => {
    await page.goto(`https://www.surf-forecast.com/breaks/${spotName}/forecasts/latest/six_day`, {
        waitUntil: 'domcontentloaded',
    });

    // Wait for the cookie banner to appear and then dismiss it
    const cookieBannerButtonSelector = '.qc-cmp2-summary-buttons button:nth-of-type(2)';
    await page.waitForSelector(cookieBannerButtonSelector, { visible: true }); // Wait for the cookie button to be visible
    const cookieButton = await page.$(cookieBannerButtonSelector);
    if (cookieButton) {
        await cookieButton.click();
        console.log('Cookie banner dismissed.');
    }

    // Wait for the forecast table to load
    await page.waitForSelector('.forecast-table__table', { visible: true }); // Wait until the table is visible

    // Click the expand button for the first column
    const expandButton = await page.$('.forecast-table-days__button');
    if (expandButton) {
        await expandButton.click();
        console.log('Column expanded.');
    }

    const screenshot = await db.surfSessionScreenshot.create({
        data: { surfSessionId },
    });

    // Capture screenshot of the expanded first column
    const tableElement = await page.$('.forecast-table__table');
    if (tableElement) {
        const boundingBox = await tableElement.boundingBox();
        if (boundingBox) {
            // Capture the screenshot into a buffer instead of saving locally
            const screenshotBuffer = await page.screenshot({
                clip: {
                    x: boundingBox.x + 75, // Start cropping 75px from the left of the bounding box
                    y: boundingBox.y + 560, // Start cropping at a specified position, adjust as needed
                    width: 190, // Crop 140px to the right (first column width)
                    height: boundingBox.height, // Capture the full height of the table
                },
            });

            // Upload to S3
            const fileName = `${screenshot.id}.png`; // Dynamically generate file name
            const params = {
                Bucket: bucketName,
                Key: fileName, // The name of the file to be saved in the S3 bucket
                Body: screenshotBuffer,
                ContentType: 'image/png', // The MIME type of the file
            };

            // Upload the screenshot to S3
            await s3.upload(params).promise();
            console.log(`Screenshot uploaded to S3 as ${fileName}`);
        }
    } else {
        console.log('no scrrenshot');
    }
};

export const handleError = ({ error }: { error: unknown }) => {
    if (error instanceof Error) {
        throw new Error(`Error creating screenshot: ${error.message}`);
    } else {
        throw new Error(`Error creating screenshot: ${String(error)}`);
    }
};
