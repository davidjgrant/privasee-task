const Airtable = require('airtable');

const createId = require('@paralleldrive/cuid2').createId();

module.exports = function () {
  const base = new Airtable({
    apiKey:
      'patkuF1DXzDv1pLHW.70ce17bc7843a88afd0a795126745fc21212b061c5a9457d378ea704081e202a',
  }).base('appcmzurr4byE791Q');

  const operations = {
    GET,
    POST,
    PUT,
    DELETE,
  };

  function GET(req, res) {
    base('Imported table').find('reclOglXmTDK0nMiN', function (err, record) {
      if (err) {
        console.error(err);
        return;
      }
      res.send(record.fields);
    });
  }

  function POST(req, res) {
    const { body } = req;

    const { companyName, question, answer, updatedAt, updatedBy, createdBy } =
      body;

    const createdAt = new Date()
      .toISOString()
      .replace(/T/, ' ')
      .replace(/\..+/, '');

    base('Imported table').create(
      [
        {
          fields: {
            _recordId: createId(),
            companyName,
            question,
            answer,
            _companyId: 63297,
            createdAt,
            updatedAt,
            updatedBy,
            createdBy,
          },
        },
      ],

      function (err, records) {
        if (err) {
          console.error(err);
          return;
        }
        records.forEach(function (record) {
          res.status(201).send(console.log(record.getId()));
        });
      }
    );
  }

  function PUT(req, res) {
    base('Imported table').update(
      [
        {
          id: 'reclOglXmTDK0nMiN',
          fields: {
            _recordId: 'recMqPCsDQ4KVPYEL',
            'Company Name': 'Test Company Limited',
            Question:
              'Do you collect any Special Category Data and if so, how do you use it?',
            Answer:
              'As a Controller, Test Company doesn’t process any Special Category Data.',
            _companyId: 63297,
            'Created At': '2024-01-15 14:46',
            'Updated At': '15/1/2024 2:47pm',
            'Updated By': 'founders+alex@privasee.io',
            'Created By': 'founders+alex@privasee.io',
          },
        },
      ],
      function (err, records) {
        if (err) {
          console.error(err);
          return;
        }
        records.forEach(function (record) {
          console.log(record.get('_recordId'));
        });
      }
    );
  }

  function DELETE(req, res) {
    const { body } = req;

    const { recordId } = body;

    base('Imported table').destroy(recordId, function (err, deletedRecord) {
      if (err) {
        console.error(err);
        return;
      }
      res.status(200).send(console.log('Deleted record', deletedRecord.id));
    });
  }

  GET.apiDoc = {
    summary: 'Fetch record.',
    operationId: 'getRecord',
    responses: {
      200: {
        description: 'Get record.',
        schema: {
          type: 'array',
          items: {
            $ref: '#/definitions/Record',
          },
        },
      },
    },
  };

  POST.apiDoc = {
    summary: 'Create record.',
    operationId: 'createRecord',
    consumes: ['application/json'],
    parameters: [
      {
        in: 'body',
        name: 'record',
        schema: {
          $ref: '#/definitions/Record',
        },
      },
    ],
    responses: {
      201: {
        description: 'Created',
      },
    },
  };

  PUT.apiDoc = {
    summary: 'Update record.',
    operationId: 'updateRecord',
    parameters: [
      {
        in: 'body',
        name: 'record',
        schema: {
          $ref: '#/definitions/Record',
        },
      },
    ],
    responses: {
      200: {
        description: 'Updated ok',
      },
    },
  };

  DELETE.apiDoc = {
    summary: 'Delete record.',
    operationId: 'deleteRecord',
    consumes: ['application/json'],
    parameters: [
      {
        in: 'body',
        name: 'Delete Record',
        schema: {
          $ref: '#/definitions/DeleteRecord',
        },
      },
    ],
    responses: {
      200: {
        description: 'Deleted',
      },
    },
  };

  return operations;
};
