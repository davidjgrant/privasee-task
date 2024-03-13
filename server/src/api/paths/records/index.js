const Airtable = require('airtable');

module.exports = function () {
  const base = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY,
  }).base('appcmzurr4byE791Q');

  const operations = {
    GET,
  };

  function GET(req, res) {
    base('Imported table')
      .select({
        // Selecting the first 3 records in Grid view:
        maxRecords: 10,
        view: 'Grid view',
      })
      .eachPage(
        function page(records, fetchNextPage) {
          const fields = records.map((record) => record.fields);

          res.send(fields);
          fetchNextPage();
        },
        function done(err) {
          if (err) {
            console.error(err);
            return;
          }
        }
      );
  }

  GET.apiDoc = {
    summary: 'Fetch 10 records.',
    operationId: 'getRecords',
    responses: {
      200: {
        description: 'List of records.',
        schema: {
          type: 'array',
          items: {
            $ref: '#/definitions/Records',
          },
        },
      },
    },
  };

  return operations;
};
