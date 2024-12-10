import { useState, useEffect } from "react";
import axios from "axios";

// Singleton to store fetched data
let sensorData: any[] = [];
let fetchPromise: Promise<void> | null = null;

// Function to fetch and cache data
export const fetchSensorData = async () => {
  if (fetchPromise) return fetchPromise;

  fetchPromise = new Promise<void>(async (resolve, reject) => {
    try {
      const response = await axios.get(
        "https://plan-tree-amber.vercel.app/sensor-data"
      );
      sensorData = response.data;
      resolve();
    } catch (error) {
      console.error("Error fetching sensor data:", error);
      reject(error);
    } finally {
      fetchPromise = null; // Reset for future calls
    }
  });

  return fetchPromise;
};

// Hook for accessing sensorData
export const useSensorData = () => {
  const [data, setData] = useState(sensorData);
  const [loading, setLoading] = useState(!sensorData.length);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (sensorData.length === 0) {
      setLoading(true);
      fetchSensorData()
        .then(() => {
          setData(sensorData);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    }
  }, []);

  return { data, loading, error };
};
