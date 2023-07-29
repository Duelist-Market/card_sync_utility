# Card Sync Utility

Support functions for the duelistmarket application, used for fetching and loading initial data.

## Scripts

- [create_cards.ts](./src/create_cards.ts)

  - Creates a list of SQL statements which will create all the insert every Yugioh card present in [cards.json](./src/cards.json)

- [images.ts](./src/images.ts)

  - Downloads all the Yugioh card images listed in [cards.json](./src/cards.json) and stores them in an S3 bucket for later use by the application
  - Requires the following variables
    - AWS_ACCESS_KEY_ID: An AWS Acces key for an IAM user with permission to put object to an S3 bucket
    - AWS_SECRET_ACCESS_KEY: AWS secret for the same user.

- [listing.ts](./src/listing.ts)

  - Creates cards.json by fetching data from the [ygoprodeck API](https://ygoprodeck.com/api-guide/). Cards from the TCG format in particular are retrieved.

- [initialDb.sql](./sql/initialDb.sql)
  - Script for creating the initial database structure and loading reference data for cards such as
    - types
    - attributes
    - sub_types
