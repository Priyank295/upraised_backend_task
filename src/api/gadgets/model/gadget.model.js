const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Gadget',
  tableName: 'gadgets',
  columns: {
    id: {
      primary: true,
      type: 'uuid',
      generated: 'uuid',
    },
    name: {
      type: 'varchar',
    },
    status: {
      type: 'enum',
      enum: ['Available', 'Deployed', 'Destroyed', 'Decommissioned'],
      default: 'Available',
    },
    decommissionedAt: {
      type: 'timestamp',
      nullable: true,
    },
    createdAt: {
        type: 'timestamp',
        createDate: true,
    },
    updatedAt: {
        type: 'timestamp',
        updateDate: true,
    },
  },
});