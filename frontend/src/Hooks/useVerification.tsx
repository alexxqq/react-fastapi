import { useEffect, useState } from 'react';
import authService from '../services/auth.service';
import { user } from '../common/types/type';

const useRenderVerification = () => {
  const [shouldRender, setShouldRender] = useState<false | null | user>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result:any = await authService.verify();


        setShouldRender(result);
      } catch (error) {
        console.error('Error during verification.');
        setShouldRender(false);
  
      }
    };

    fetchData(); 
  }, []);

  return shouldRender;
};

export default useRenderVerification;
