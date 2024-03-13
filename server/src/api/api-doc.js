const apiDoc = {
  swagger: '2.0',
  basePath: '/',
  info: {
    title: 'Q&A app API.',
    version: '1.0.0',
  },
  definitions: {
    Records: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
        },
        fields: {
          type: 'object',
          properties: {
            _recordId: {
              type: 'string',
            },
            companyName: {
              type: 'string',
            },
            question: {
              type: 'string',
            },
            answer: {
              type: 'string',
            },
            _companyId: {
              type: 'number',
            },
            createdAt: {
              type: 'string',
            },
            updatedAt: {
              type: 'string',
            },
            updatedBy: {
              type: 'string',
            },
            createdBy: {
              type: 'string',
            },
          },
        },
      },
      required: ['id', 'fields'],
    },
    Record: {
      type: 'object',
      properties: {
        fields: {
          type: 'object',
          properties: {
            _recordId: {
              type: 'string',
            },
            companyName: {
              type: 'string',
            },
            question: {
              type: 'string',
            },
            answer: {
              type: 'string',
            },
            _companyId: {
              type: 'number',
            },
            createdAt: {
              type: 'string',
            },
            updatedAt: {
              type: 'string',
            },
            updatedBy: {
              type: 'string',
            },
            createdBy: {
              type: 'string',
            },
          },
        },
      },
      required: ['fields'],
    },
    DeleteRecord: {
      type: 'object',
      properties: {
        recordId: {
          type: 'string',
        },
      },
      required: ['recordId'],
    },
  },
  paths: {},
};

module.exports = apiDoc;
