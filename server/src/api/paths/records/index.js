const Airtable = require('airtable');

module.exports = function () {
  const base = new Airtable({
    apiKey:
      'patkuF1DXzDv1pLHW.70ce17bc7843a88afd0a795126745fc21212b061c5a9457d378ea704081e202a',
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
