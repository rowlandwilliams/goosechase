import { z } from 'zod';
import puppeteer from 'puppeteer';
import AWS from 'aws-sdk';
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc';
import { S3Client, ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { TRPCError } from '@trpc/server';

const s3Client = new S3Client({
    region: 'eu-west-2',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

const url = 'https://www.surf-forecast.com/breaks/Thurso-East/forecasts/latest/six_day';
const s3 = new AWS.S3();
const BUCKET_NAME = 'surf-forecast-screenshots';

async function generateSignedUrl(bucketName: string, objectKey: string, expiresInSeconds = 3600): Promise<string> {
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
}

export const surfSessionRouter = createTRPCRouter({
    allScreenshots: protectedProcedure.query(async () => {
        try {
            const params = {
                Bucket: BUCKET_NAME, // Your S3 bucket name
            };

            const command = new ListObjectsV2Command(params);
            const data = await s3Client.send(command);

            if (!data.Contents) {
                return [];
            }

            // Extract file keys (paths) of the objects in the specified folder
            const urlsPromises = data.Contents?.map(async (item) => {
                const url = item.Key ? await generateSignedUrl(BUCKET_NAME, item.Key) : '';

                return url;
            });

            const urls = (await Promise.all(urlsPromises)).filter((url) => url);

            return urls;
        } catch (error) {
            console.error('Error fetching screenshots:', error);
            throw new Error('Failed to fetch screenshots from S3');
        }
    }),
    createScreenshot: protectedProcedure.input(z.object({ spotName: z.string() })).mutation(async ({ input }) => {
        console.log('yo', input.spotName);

        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        try {
            await page.goto(url, { waitUntil: 'domcontentloaded' });

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
                    const fileName = `first-column-screenshot-${Date.now()}.png`; // Dynamically generate file name
                    const params = {
                        Bucket: BUCKET_NAME,
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
        } catch (error) {
            console.log('Error:', error);
            throw new TRPCError({ message: 'Error creating', code: 'BAD_REQUEST' });
        } finally {
            await browser.close();
        }
        return { success: true };
    }),

    getSurfSessions: protectedProcedure.query(async ({ ctx }) => {
        const suh = ctx.db.surfSession.findMany();

        console.log(suh);

        return [
            {
                id: 1,
                name: 'Fraserburgh',
                rating: 1,
                image: 'https://www.northcoast500.com/wp-content/uploads/2018/12/Mark-Boyd-Thurso-East-_-Malcolm-Anderson3-1200x800.jpg',
            },
            { id: 2, name: 'St Andrews', rating: 3 },
            { id: 3, name: 'Scarborough', rating: 5 },
            { id: 4, name: 'Thurso', rating: 2 },
        ];
    }),

    getSecretMessage: protectedProcedure.query(() => {
        return 'you can now see this secret message!';
    }),
});
