import { useQuery } from 'react-query';
import { baseApi } from '../utils/const';

interface CityCountryData {
    country: string;
    cities: string[];
}

const fetchCityCountryData = async (): Promise<CityCountryData[]> => {
    try {
        const response = await fetch(`${baseApi}countries`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data: { data: CityCountryData[] } = await response.json();
        return data.data;
    } catch (error) {
        throw new Error('Error fetching data');
    }
};

export const useCityCountryData = () => {
    const { data, isLoading, isError } = useQuery<CityCountryData[], Error>('cityCountryData', fetchCityCountryData, { refetchOnWindowFocus: false });

    const cityList = data
        ? data
              .map((entry) => {
                  return {
                      city: entry.cities,
                      country: entry.country,
                  };
              })
              .flat()
        : [];
    const countryList = data ? data.map((entry) => entry.country) : [];

    return {
        cityList,
        countryList,
        isLoading,
        isError,
    };
};
