import httpService from './httpService';

const categoryEndpoint = 'category/';

const categoryService = {
  get: async () => {
    const { data } = await httpService.get(categoryEndpoint);
    return data;
  }
};

export default categoryService;
