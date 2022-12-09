import httpService from './httpService';

const foodEndpoint = 'food/';

const foodService = {
  get: async () => {
    const { data } = await httpService.get(foodEndpoint);
    return data;
  },
  removeFood: async (productId) => {
    const { data } = await httpService.delete(foodEndpoint + productId);
    return data;
  }
};

export default foodService;
