import { useState, useEffect } from "react";
import { collection } from "firebase/firestore";
import { getCountFromServer } from "firebase/firestore";
import { db } from "../firebase-config";

import Skeleton from "../components/Dashboard/pages/components/Skeleton/skeleton";

function PessoasCount({ user }) {
  const [pessoas, setPessoas] = useState(0);
  const [loading, setLoading] = useState(false);
 
  useEffect(() => {    
    setLoading(true)
    async function fetchPessoas() {
      const pessoasRef = collection(db, "users", user.uid, "pessoas");
      const snapshot = await getCountFromServer(pessoasRef);
      setPessoas(snapshot.data().count);
      setLoading(false)
    }
    fetchPessoas();        
  }, [user.uid]);  

  return (
    (loading? <Skeleton width="15px" height="20px"/> : <span>{pessoas}</span>)
  )
}

async function updatePessoasCount(user, setPessoas) {
  const pessoasRef = collection(db, "users", user.uid, "pessoas", "count");
  const snapshot = await getCountFromServer(pessoasRef);
  setPessoas(snapshot.data().count);    
  alert("a");
} 

export { updatePessoasCount };
export default PessoasCount;

