import { useEffect, useState } from 'react';
import authService from '../services/auth.service';

const useRenderVerification = () => {
  const [shouldRender, setShouldRender] = useState<boolean | null | string>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await authService.verify();


        setShouldRender(result);
      } catch (error) {
        console.error('Error during verification:', error);
        setShouldRender(false);
  
      }
    };

    fetchData(); 
  }, []);

  return shouldRender;
};

export default useRenderVerification;
