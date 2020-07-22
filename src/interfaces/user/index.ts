import mongodb from 'mongodb'; 

export interface User { 
  _id: mongodb.ObjectID,
  name: string, 
  email: string, 
  birthdate: Date, 
  password: string,
  income: number
}
