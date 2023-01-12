import axios from 'axios';
import { CyclistService } from '../../services/cyclistService/CyclistService';

jest.mock('axios');

describe('CyclistService', () => {

  it('should return true when rent a bike', async () => {
    const axiosMock = jest.mocked(axios);
    axiosMock.get.mockResolvedValue({data: true});

    const cyclistService = new CyclistService('localhost:4002');
    const canRent = await cyclistService.canRentBike('d5446ea3-aa72-486f-9f11-203c5c04de67');

    expect(canRent).toBeTruthy();
  });

  it('should return a cyclist when notify the rent in progress', async () => {
    const axiosMock = jest.mocked(axios);
    axiosMock.post.mockResolvedValue({data: {id: 'd5446ea3-aa72-486f-9f11-203c5c04de67'}});

    const cyclistService = new CyclistService('localhost:4002');
    const cyclist = await cyclistService.notifyRentInProgress('d5446ea3-aa72-486f-9f11-203c5c04de67');

    expect(cyclist.id).toEqual('d5446ea3-aa72-486f-9f11-203c5c04de67');
  });

});