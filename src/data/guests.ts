export interface Guest {
  id: string;
  name: string;
  seats: number;
  group: string;
}

export const guests = [
  {
    "id": "vanessa-rincon",
    "name": "Vanessa Rincón",
    "seats": 1,
    "group": "INVITADOS"
  },
  {
    "id": "taylor-londono",
    "name": "Taylor Londoño",
    "seats": 1,
    "group": "INVITADOS"
  },
  {
    "id": "danna-belen-jurado",
    "name": "Danna Belén Jurado",
    "seats": 1,
    "group": "INVITADOS"
  },
  {
    "id": "jorge-villegas",
    "name": "Jorge Villegas",
    "seats": 1,
    "group": "INVITADOS"
  },
  {
    "id": "marlon-herrera",
    "name": "Marlon Herrera",
    "seats": 1,
    "group": "INVITADOS"
  },
  {
    "id": "carlos-benitez",
    "name": "Carlos Benitez",
    "seats": 1,
    "group": "INVITADOS"
  },
  {
    "id": "andrea-ascanio",
    "name": "Andrea Ascanio",
    "seats": 1,
    "group": "INVITADOS"
  },
  {
    "id": "aristides-sotomayor",
    "name": "Aristides Sotomayor",
    "seats": 1,
    "group": "INVITADOS"
  },
  {
    "id": "lucy-rubio-de-sotomayor",
    "name": "Lucy Rubio de Sotomayor",
    "seats": 1,
    "group": "INVITADOS"
  },
  {
    "id": "rafael-niebles",
    "name": "Rafael Niebles",
    "seats": 1,
    "group": "INVITADOS"
  },
  {
    "id": "nora-de-niebles",
    "name": "Nora de Niebles",
    "seats": 1,
    "group": "INVITADOS"
  },
  {
    "id": "alvaro-andres-lorduy-zarco",
    "name": "Alvaro Andrés Lorduy Zarco",
    "seats": 1,
    "group": "GOMEZ"
  },
  {
    "id": "oscar-lorduy-zarco",
    "name": "Oscar Lorduy Zarco",
    "seats": 1,
    "group": "GOMEZ"
  },
  {
    "id": "mario-alonso-lorduy-zarco",
    "name": "Mario Alonso Lorduy Zarco",
    "seats": 1,
    "group": "GOMEZ"
  },
  {
    "id": "dayana-duncan",
    "name": "Dayana Duncan",
    "seats": 1,
    "group": "GOMEZ"
  },
  {
    "id": "luis-guillermo-stevenson-osorio",
    "name": "Luis Guillermo Stevenson Osorio",
    "seats": 1,
    "group": "AMIGOS EN COMÚN"
  },
  {
    "id": "elena-osorio",
    "name": "Elena Osorio",
    "seats": 1,
    "group": "AMIGOS ADULTOS"
  },
  {
    "id": "amelia-osorio",
    "name": "Amelia Osorio",
    "seats": 1,
    "group": "AMIGOS ADULTOS"
  },
  {
    "id": "paula-barrera-del-rio",
    "name": "Paula Barrera del Río",
    "seats": 1,
    "group": "AMIGOS EN COMÚN"
  }
] as const satisfies readonly Guest[];

const guestsById = new Map<string, Guest>(guests.map((guest) => [guest.id, guest]));

export const getGuestById = (guestId: string | undefined): Guest | undefined => {
  if (!guestId) return undefined;

  return guestsById.get(guestId);
};

export const getInvitationPath = (guest: Guest) => `/invitacion/${guest.id}`;
