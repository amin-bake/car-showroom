import { CarProps } from "@/types";

export async function fetchCars() {
    const headers = {
        'x-rapidapi-key': '381f8aadbbmshad0eaf4d8a3e736p10a83cjsnca8590711396',
        'x-rapidapi-host': 'cars-by-api-ninjas.p.rapidapi.com'
    }
    
    const response = await fetch('https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=q3', {
        headers: headers,
    });

    const data = await response.json();
    
    return data;
};

export const calculateCarRent = (city_mpg: number, year: number) => {
    const basePricePerDay = 50; // Base Rental price per day in dollars
    const mileageFactor = 0.1; // Additional rate per mile driven in dollars
    const ageFactor = 0.05; // Additional rate per year of vehicle age in dollars

    // Calculate additional rate based on mileage and age
    const mileageRate = city_mpg * mileageFactor;
    const ageRate = (new Date().getFullYear() - year) * ageFactor;
    
    // Calculate total rate per day
    const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;
    
    return rentalRatePerDay.toFixed(0);
};

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
    // key... daefd14b-9f2b-4968-9e4d-9d4bb4af01d1
    const url = new URL('https://cdn.imagin.studio/getimage');
    const { make, year, model } = car;
    url.searchParams.append('customer', 'img');
    url.searchParams.append('make', make);
    url.searchParams.append('modelFamily', model.split(' ')[0]);
    url.searchParams.append('zoomType', 'fullscreen');
    url.searchParams.append('modelYear', `${year}`);
    url.searchParams.append('angle', `${angle}`);

    return `${url}`;
};