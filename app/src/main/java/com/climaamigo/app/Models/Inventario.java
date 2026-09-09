package com.climaamigo.app.Models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "inventario")
public class Inventario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String codigo;

    private String nombre;

    private String descripcion;

    private String marca;

    private String modelo;

    private Integer cantidad;

    @Column(name = "stock_minimo")
    private Integer stockMinimo;

    private String estado;


    public Inventario() {
    }


}