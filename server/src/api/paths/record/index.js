const Airtable = require('airtable');

const init = require('@paralleldrive/cuid2').init();

module.exports = function () {
  const base = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY,
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

    console.log('body', body);

    const createdAt = new Date()
      .toISOString()
      .replace(/T/, ' ')
      .replace(/\..+/, '');

    base('Imported table').create(
      [
        {
          fields: {
            _recordId: 'reclOglXmTDK0nMiN',
            companyName: companyName ?? 'Test Company Limited',
            question: question ?? 'What is the meaning of life?',
            answer: '',
            _companyId: 63297,
            createdAt: '15/1/2024',
            updatedAt: '15/1/2024 2:47pm',
            updatedBy: 'founders+alex@privasee.io',
            createdBy: 'founders+alex@privasee.io',
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
    const { body } = req;

    const { companyName, question, answer, updatedBy, createdAt, createdBy } =
      body;

    console.log('body', body);

    const updatedAt = new Date()
      .toISOString()
      .replace(/T/, ' ')
      .replace(/\..+/, '');

    base('Imported table').update(
      [
        {
          id: 'reclOglXmTDK0nMiN',
          fields: {
            _recordId: 'recMqPCsDQ4KVPYEL',
            companyName: 'Test Company Limited',
            question: 'What is the meaning of life?',
            answer:
              'The meaning of life is to give life meaning. - Viktor Frankl',
            _companyId: 63297,
            createdAt: '15/1/2024',
            updatedAt: '15/1/2024 2:47pm',
            updatedBy: 'founders+alex@privasee.io',
            createdBy: 'founders+alex@privasee.io',
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

  function DELETE(req, res) {
    const { body } = req;

    const { recordId } = body;

    base('Imported table').destroy(
      ['reclOglXmTDK0nMiN'],
      function (err, deletedRecord) {
        if (err) {
          console.error(err);
          return;
        }
        res.status(200).send(console.log('Deleted record', deletedRecord.id));
      }
    );
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
