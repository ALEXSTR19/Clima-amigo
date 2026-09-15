package com.climaamigo.app.Models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "Mantenimientos")
public class Mantenimientos {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 100)
    private String nombreCliente;

    @NotBlank
    @Size(max = 50)
    private String direccion;

    @Size(max = 255)
    private String descripcion;

    @NotBlank
    @Size(max = 80)
    private String marca;

    @NotBlank
    @Size(max = 80)
    private String modelo;

    @NotNull
    @Min(0)
    private Integer cantidad;

    @Size(max = 30)
    private String estado;

    public Mantenimientos() {
    }

}
