import httpService from './httpService';

const foodEndpoint = 'food/';

const foodService = {
  get: async () => {
    const { data } = await httpService.get(foodEndpoint);
    return data;
  },
  update: async (payload) => {
    const { data } = await httpService.patch(foodEndpoint + payload._id, payload);
    return data;
  },
  removeFood: async (productId) => {
    const { data } = await httpService.delete(foodEndpoint + productId);
    return data;
  },
  createFood: async (payload) => {
    const { data } = await httpService.post(foodEndpoint, payload);
    return data;
  }
};

export default foodService;
