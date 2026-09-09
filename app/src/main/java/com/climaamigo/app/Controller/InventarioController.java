package com.climaamigo.app.Controller;

import com.climaamigo.app.Models.Inventario;
import com.climaamigo.app.Services.InventarioService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventario")
@CrossOrigin(origins = "http://localhost:4200")
public class InventarioController {

    @Autowired
    private InventarioService inventarioService;

    // LISTAR TODO EL INVENTARIO
    @GetMapping
    public List<Inventario> listarInventario() {
        return inventarioService.listarInventario();
    }

    // BUSCAR POR ID
    @GetMapping("/{id}")
    public ResponseEntity<Inventario> obtenerPorId(@PathVariable Long id) {

        Inventario inventario = inventarioService.obtenerPorId(id);

        if (inventario == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(inventario);
    }

    // CREAR PRODUCTO / EQUIPO
    @PostMapping
    public ResponseEntity<Inventario> crear(
            @RequestBody Inventario inventario) {

        Inventario nuevo =
                inventarioService.guardar(inventario);

        return ResponseEntity.ok(nuevo);
    }

    // ACTUALIZAR
    @PutMapping("/{id}")
    public ResponseEntity<Inventario> actualizar(
            @PathVariable Long id,
            @RequestBody Inventario inventario) {

        Inventario actualizado =
                inventarioService.actualizar(id, inventario);

        if (actualizado == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(actualizado);
    }

    // ELIMINAR
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(
            @PathVariable Long id) {

        inventarioService.eliminar(id);

        return ResponseEntity.noContent().build();
    }
}