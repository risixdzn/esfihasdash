import { useState, useEffect } from "react";
import { collection } from "firebase/firestore";
import { getCountFromServer } from "firebase/firestore";
import { db } from "../firebase-config";

import Skeleton from "../components/Dashboard/pages/components/Skeleton/skeleton";

function ProdutosCount({ user }) {
  const [produtos, setProdutos] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function fetchProdutos() {
      const produtosRef = collection(db, "users", user.uid, "produtos");
      const snapshot = await getCountFromServer(produtosRef);
      const countedSnapshot = snapshot.data().count;
      if(countedSnapshot === 0){
        setProdutos(countedSnapshot);
      } else{
        setProdutos(countedSnapshot - 1)
      }  
      setLoading(false);
    }
    fetchProdutos();    
  }, [user.uid]);

  return (
    (loading? <Skeleton width="15px" height="20px"/> : <span>{produtos}</span>)
  )
}

export default ProdutosCount;
