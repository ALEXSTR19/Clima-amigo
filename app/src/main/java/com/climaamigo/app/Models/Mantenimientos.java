package com.climaamigo.app.Models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name= "Mantenimientos")
public class Mantenimientos {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombreCliente;

    private String direccion;

    private String descripcion;

    private String marca;

    private String modelo;

    private Integer cantidad;

    private String estado;

    public Mantenimientos(){

    }

}
