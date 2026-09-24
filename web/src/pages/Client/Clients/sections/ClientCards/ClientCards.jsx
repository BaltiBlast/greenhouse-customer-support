import { Link } from "react-router";
import styles from "./ClientCards.module.css";

function getAge(birthDate) {
  const today = new Date();
  const birthday = new Date(birthDate);
  let age = today.getFullYear() - birthday.getFullYear();
  const monthDifference = today.getMonth() - birthday.getMonth();

  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthday.getDate())) {
    age -= 1;
  }

  return age;
}

export default function ClientCards({ clients }) {
  if (clients.length === 0) {
    return <p className={styles.empty}>Aucun client ne correspond à cette recherche.</p>;
  }

  return (
    <ul className={styles.list}>
      {clients.map((client) => {
        const latestMeasurement = client.measurements.at(-1);

        return (
          <li key={client.id}>
            <Link className={styles.card} to={`/clients/${client.id}`}>
              <div className={styles.identity}>
                <span className={styles.initials} aria-hidden="true">
                  {client.firstName.charAt(0)}{client.lastName.charAt(0)}
                </span>
                <div>
                  <h2>{client.firstName} {client.lastName}</h2>
                  <p>{getAge(client.birthDate)} ans</p>
                </div>
              </div>

              <dl className={styles.measurements}>
                <div>
                  <dt>Taille</dt>
                  <dd>{latestMeasurement.height} cm</dd>
                </div>
                <div>
                  <dt>Poids</dt>
                  <dd>{latestMeasurement.weight} kg</dd>
                </div>
              </dl>

              <div className={styles.objective}>
                <span>Objectif</span>
                <p>{client.objectives || "Aucun objectif renseigné"}</p>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
