import { useState, useEffect } from "react";
import { collection } from "firebase/firestore";
import { getCountFromServer } from "firebase/firestore";
import { db } from "../firebase-config";

function PessoasCount({ user }) {
  const [pessoas, setPessoas] = useState(0);

  useEffect(() => {
    async function fetchPessoas() {
      const pessoasRef = collection(db, "users", user.uid, "pessoas");
      const snapshot = await getCountFromServer(pessoasRef);
      setPessoas(snapshot.data().count);
    }
    fetchPessoas();
  }, [user.uid]);

  return <span>{pessoas}</span>;
}

export default PessoasCount;