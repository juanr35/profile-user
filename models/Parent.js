import { Schema, model, models } from "mongoose"
//const { Schema, model, models } = require("mongoose")
//const mongoose = require("mongoose")

const padreSchema = new Schema({
  primer_nombre: {
    type: String,
    trim:true,
    minLength: [3,'El nombre no es coherente'],
    maxLength:[20,'El nombre no es coherente'],
  },
  segundo_nombre: {
      type: String,
      trim:true,
      minLength: [3,'El nombre no es coherente'],
      maxLength:[20,'El nombre no es coherente'],
  },
  primer_apellido: {
      type: String,
      trim:true,
      minLength: [3,'El nombre no es coherente'],
      maxLength:[20,'El nombre no es coherente'],
  },
  segundo_apellido: {
      type: String,
      trim:true,
      minLength: [3,'El nombre no es coherente'],
      maxLength:[20,'El nombre no es coherente'],
  },
  cedula: {
    select: {
      type: String
    },
    input: {
      type: String
    }
  },
  nacionalidad: {
    type: String,
    trim:true,
  },
  sexo: {
    type: String,
  },
  telefono: {
    type: String,
    trim:true,
    maxLength: [20,"El telefono no es coherente"]
  },
  email: {
    type: String,
    trim:true,
    maxLength: [50,"El email no es coherente"]
  },
  profesion: {
    type: String,trim:true
  },
  empresa: {
    type: String,trim:true
  }
})

export default padreSchema
//module.exports = mongoose.model("Parent", padreSchema)
//export default models.Parent || model("Parent", padreSchema);