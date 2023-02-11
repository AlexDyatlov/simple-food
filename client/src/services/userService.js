import httpService from './httpService';
import localStorageService from './localStorageService';

const userEndpoint = 'user/';

const userService = {
  getCurrentUser: async () => {
    const { data } = await httpService.get(userEndpoint + localStorageService.getUserId());
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.put(userEndpoint + payload._id, payload);
    return data;
  },
  createBasket: async (payload) => {
    const { data } = await httpService.patch(userEndpoint + localStorageService.getUserId(), payload);
    return data;
  },
  removeBasket: async (userId) => {
    const { data } = await httpService.delete(userEndpoint + userId);
    return data;
  }
};

export default userService;
