// on indique que ce fichier est un composant client
"use client";

import { use, useEffect, useState } from "react";
import api from "./api";
import toast from "react-hot-toast";
import {
  Activity,
  ArrowDownCircle,
  ArrowUpCircle,
  PlusCircle,
  Trash,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { text } from "stream/consumers";

type Transaction = {
  id: string;
  text: string;
  amount: number;
  created_at: string;
};

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [text, setText] = useState<string>(""); // on initialise le state text a une chaine vide
  const [amount, setAmount] = useState<number | "">(""); // on initialise le state amount a une chaine vide
  const [loading, setLoading] = useState<boolean>(false); // on initialise le state loading a false

  // fonction pour recuperer les transactions depuis l'API
  const getTransactions = async () => {
    try {
      const res = await api.get<Transaction[]>("transactions/"); // on precise le type de retour attendu et l'url qui faut appeler
      setTransactions(res.data); // on met a jour le state avec les transactions recues
      toast.success("Transactions chargées avec succès !");
    } catch (error) {
      toast.error("Erreur lors du chargement des transactions.");
      console.error("Erreur lors du chargement des transactions :", error);
    }
  };
  const deleteTransactions = async (id: string) => {
    // on precise que la fonction prend en argument un id de type string qui sera l'id la transaction a supprimer
    try {
      await api.delete(`transactions/${id}/`); // on appelle l'api en precisant l'id de la transaction a supprimer
      getTransactions(); // on rafraichit la liste des transactions
      toast.success("Transaction supprimée avec succès !");
    } catch (error) {
      toast.error("Erreur suppression transaction.");
      console.error("Erreur suppression transaction :", error);
    }
  };
  const addTransactions = async () => {
    if (!text || amount == "" || isNaN(Number(amount))) { //on verifie que le texte n'est pas vide et que le montant est un nombre
      toast.error("Veuillez remplir tous les champs correctement.");
      return;
    }
    setLoading(true);

    try {
      
      const res = await api.post<Transaction>(`transactions/`,{  //on post une nouvelle transaction en precisant qu'elle sera de type Transaction
        text,
        amount: Number(amount) // on convertit le montant en nombre avec Number
      });
      getTransactions();
      const modal = document.getElementById("my_modal_3") as HTMLDialogElement // on recupere la modale qu'on vas stocker dans une variable
      if(modal){
        modal.close() // on ferme la modale si elle existe
      }

      toast.success("Transaction ajoutée avec succès !");
      setText(""); // on reinitialise le state text a une chaine vide
      setAmount(""); // on reinitialise le state amount a une chaine vide
      
    } catch (error) {
      toast.error("Erreur suppression transaction.");
      console.error("Erreur suppression transaction :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []); // le tableau vide en second argument indique que l'effet ne doit s'executer qu'une seule fois au montage du composant

  const amounts = transactions.map((t) => Number(t.amount) || 0); // on accede a la liste des transactions qu'on va parcourir pour recuperer uniquement les montants avec "map" et on la stocke dans une variable, on convertira chaque montant recu en objet nombre avec "Number" et on s'assure que si jamais le montant n'est pas un nombre on retourne 0 avec "|| 0"

  const balance = amounts.reduce((acc, item) => (acc += item), 0) || 0; // on calcule le solde en utilisant "reduce" pour sommer tous les montants, on initialise l'accumulateur a 0 on met 0 par défaut comme valeur de notre balance

  const income =
    amounts.filter((a) => a > 0).reduce((acc, item) => (acc += item), 0) || 0; // on calcule les revenus en filtrant les montants positifs et en les sommant
  const expense =
    amounts.filter((a) => a < 0).reduce((acc, item) => (acc += item), 0) * -1 ||
    0; // on calcule les depenses en filtrant les montants negatifs et en les sommant, on multiplie par -1 pour avoir une valeur positive

  const ratio = (expense === 0 ? 0 : income / expense) || 0; // on calcule le ratio revenu/depense en divisant les revenus par les depenses, si les depenses sont nulles on retourne 0

  const formatDate = (dateString: string) => {
    // fonction pour formater une date en francais
    const date = new Date(dateString); // conversion de la chaine de caractere en objet date

    return date.toLocaleString("fr-FR", {
      // formatage en francais
      // format jour/mois/annee heure:minute
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="w-2/3 flex flex-col gap-4">
      <div className="flex justify-between rounded-2xl border-2 border-warning/10 border-dashed bg-warning/5 p-5">
        {/* - border-warning/10 → couleur personnalisée avec opacité (si warning contient la couleur défini dans notre thème Tailwind on aurait pu mettre broder-blue/10) bg c pr la couleur de l'arriere plan, - /5 → ajoute une opacité de 5% - p-x → ajoute une padding (marge intérieure)*/}
        <div className="flex flex-col gap-1">
          <div>
            <div className="badge badge-soft">
              {/* badge qui est une sorte denvellope */}
              <Wallet className="w-4 h4" />
              votre solde
            </div>
          </div>
          <div className="stat-value">
            {/* toFixed(2) pour afficher 2 chiffres après la virgule */}
            {balance.toFixed(2)} €
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div>
            <div className="badge badge-soft badge-success">
              <ArrowUpCircle className="w-4 h4" />
              Revenus
            </div>
          </div>
          <div className="stat-value">{income.toFixed(2)} €</div>
        </div>
        <div className="flex flex-col gap-1">
          <div>
            <div className="badge badge-soft badge-error">
              <ArrowDownCircle className="w-4 h4" />
              Dépenses
            </div>
          </div>
          <div className="stat-value">{expense.toFixed(2)} €</div>
        </div>
      </div>

      <div className="rounded-2xl border-2 border-warning/10 border-dashed bg-warning/5 p-5">
        <div className="flex justify-between items-center mb-1">
          <div className="badge badge-soft badge-warning  gap-1">
            <Activity className="w-4 h-4" />
            Dépenses / Revenus
          </div>
          <div>{ratio.toFixed(0)}%</div>
          {/* on veur donc 0 chiffre après la virgule */}
        </div>
        {/* composant progress de tailwind pour afficher une barre de progression */}
        <progress
          className="progress progress-warning w-full"
          value={ratio}
          max={100}
        ></progress>
      </div>

      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn btn-warning"
        onClick={() =>
          (
            document.getElementById("my_modal_3") as HTMLDialogElement
          ).showModal()
        }
      >
        {/* // on recupere l'élément en tant que HTMLDialogElement car TypeScript ne le reconnait pas automatiquement et on appelle la méthode showModal() pour afficher la modale */}
        <PlusCircle className="w-4 h-4" />
        Ajouter une transaction
      </button>

      <div className="rounded-2xl border-2 border-warning/10 border-dashed bg-warning/5">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Description</th>
              <th>Montant</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* on parcourt la liste des transactions avec map et on recupere chaque transaction t et son index dans la liste */}
            {transactions.map((t, index) => (
              <tr
                key={t.id} // on utilise l'id de la transaction comme clé primaire unique pour chaque élément de la liste
              >
                <th>{index + 1}</th>
                {/* on affiche l'index +1 pour commencer a 1 et pas 0 */}
                <td>{t.text}</td>
                <td className="font-semibold flex items-center gap-2">
                  {t.amount > 0 ? (
                    <TrendingUp className="text-success w-6 h-6" />
                  ) : (
                    <TrendingDown className="text-error w-6 h-6" />
                  )}
                  {t.amount > 0 ? `+${t.amount}` : `${t.amount}`} €
                  {/* on affiche le montant avec un + si c'est un revenu sinon on affiche juste le montant */}
                </td>
                <td>
                  {formatDate(t.created_at)}
                  {/* on formate la date avec la fonction formatDate */}
                </td>
                <td>
                  <button
                    onClick={() => deleteTransactions(t.id)} // on appelle la fonction de suppression en lui passant l'id de la transaction a supprimer
                    title="Supprimer la transaction"
                    className="btn btn-small btn-error btn-soft"
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <dialog id="my_modal_3" className="modal backdrop-blur">
        <div className="modal-box border-2 border-warning/10 border-dashed">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Ajouter une transaction</h3>
            <div className="flex flex-col gap-4 mt-4">
              <div className="flex flex-col gap-2">
                <label className="label">Texte</label>
                <input 
                type="text" 
                name="text" 
                value={text}
                onChange={(e) => setText(e.target.value)} //on recupere la valeur de l'input et on met a jour le state text avec setText, e est l'evenement de changement et e.target.value est la valeur de l'input,
                placeholder="Entrez le texte..."
                className="input w-full"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="label">Montant (négatif - dépense, positif - revenu)</label> 
                <input 
                type="number" 
                name="amount" 
                value={amount}
                onChange={(e) => setAmount(
                  e.target.value === "" ? "" : Number(e.target.value)
                )} //ici on convertit la valeur de l'input en nombre avec Number, si l'input est vide on met une chaine vide sinon on convertit en nombre
                placeholder="Entrez le montant..."
                className="input w-full"
                />
              </div>
              <button className="w-full btn btn-warning"
              onClick={addTransactions}
              disabled={loading} // on desactive le bouton si le state loading est a true
              >
                {loading && <Activity className="w-4 h-4 animate-spin mr-2" />} 
                {/* si loading est a true on affiche une icone de chargement avec une animation de rotation */}
                <PlusCircle className="w-4 h-4" />
                Ajouter
              </button>
            </div>
        </div>
      </dialog>

    </div>
  );
}
