# Goosechase

An app to help you when goosechasin' around the east coast of the United Kingdom, renowned for it's quality but cold and inconsistent surf. 

This is the start of a project to help me log my surf sessions by recording the forecast conditions from surf-forecast.com as a screenshot that I can refer back to at a later date.


Tech Used

- T3 app
- AWS S3 (for screenshot storage)
- shadcn ui (well-designed, reusable components)
- Puppeteer (for web scraping / screenshot capture)
- Zustand (for simple and lightweight state management)

It's still a work in progress, heres what I have added so far:

- Simple Login using next-auth (credentials provider)
- Basic sign up
- Ability to create a new session (with a nice autosave feature)
- Backend logic to take a screenshot of a given spot and save it to an S3 bucket (this isn't connected to any UI yet for viewing screenshots etc)