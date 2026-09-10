package com.climaamigo.app.Services;

import com.climaamigo.app.Models.Inventario;
import com.climaamigo.app.Repositories.InventarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InventarioService {

    @Autowired
    private InventarioRepository inventarioRepository;


    // LISTAR TODO
    public List<Inventario> listarInventario() {
        return inventarioRepository.findAll();
    }


    // BUSCAR POR ID
    public Inventario obtenerPorId(Long id) {

        Optional<Inventario> inventario =
                inventarioRepository.findById(id);

        return inventario.orElse(null);
    }


    // GUARDAR
    public Inventario guardar(Inventario inventario) {

        actualizarEstado(inventario);

        return inventarioRepository.save(inventario);
    }


    // ACTUALIZAR
    public Inventario actualizar(
            Long id,
            Inventario datosInventario) {

        Optional<Inventario> existente =
                inventarioRepository.findById(id);

        if (existente.isEmpty()) {
            return null;
        }

        Inventario inventario = existente.get();

        inventario.setCodigo(
                datosInventario.getCodigo()
        );

        inventario.setNombre(
                datosInventario.getNombre()
        );

        inventario.setDescripcion(
                datosInventario.getDescripcion()
        );

        inventario.setMarca(
                datosInventario.getMarca()
        );

        inventario.setModelo(
                datosInventario.getModelo()
        );

        inventario.setCantidad(
                datosInventario.getCantidad()
        );

        inventario.setStockMinimo(
                datosInventario.getStockMinimo()
        );

        actualizarEstado(inventario);

        return inventarioRepository.save(inventario);
    }


    // ELIMINAR
    public void eliminar(Long id) {
        if (inventarioRepository.existsById(id)) {
            inventarioRepository.deleteById(id);
        }
    }


    // LÓGICA PARA ESTADO DEL INVENTARIO
    private void actualizarEstado(
            Inventario inventario) {

        int cantidad = inventario.getCantidad() == null ? 0 : inventario.getCantidad();
        int stockMinimo = inventario.getStockMinimo() == null ? 0 : inventario.getStockMinimo();

        inventario.setCantidad(cantidad);
        inventario.setStockMinimo(stockMinimo);

        if (cantidad == 0) {

            inventario.setEstado("AGOTADO");

        } else if (
                inventario.getCantidad()
                        <= inventario.getStockMinimo()
        ) {

            inventario.setEstado("STOCK BAJO");

        } else {

            inventario.setEstado("DISPONIBLE");
        }
    }
}
