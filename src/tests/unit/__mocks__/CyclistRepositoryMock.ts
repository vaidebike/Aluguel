const CyclistRepositoryMock = jest.fn().mockImplementation(() => ({
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  verifyIfEmailExists: jest.fn(),
  activate: jest.fn()
}));

export default CyclistRepositoryMock;