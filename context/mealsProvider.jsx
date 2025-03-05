import React, { createContext, useState, useEffect, useContext } from "react";

// Create Context
const MealsContext = createContext();

// API Endpoints
const API_URLS = {
  seafood: "https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood",
  beef: "https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef",
  pork: "https://www.themealdb.com/api/json/v1/1/filter.php?c=Pork",
  chicken: "https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken",
};

// Provider Component
export const MealsProvider = ({ children }) => {
  const [meals, setMeals] = useState({
    seafood: [],
    beef: [],
    pork: [],
    chicken: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const responses = await Promise.all(
          Object.entries(API_URLS).map(async ([key, url]) => {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data.meals)
            return { [key]: data.meals };
          })
        );

        // Merge the fetched data into one object
        const mergedMeals = responses.reduce((acc, curr) => ({ ...acc, ...curr }), {});
        setMeals(mergedMeals);
      } catch (error) {
        console.error("Error fetching meals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  return (
    <MealsContext.Provider value={{ meals, loading }}>
      {children}
    </MealsContext.Provider>
  );
};

// Custom Hook for using meals
export const useMeals = () => useContext(MealsContext);
