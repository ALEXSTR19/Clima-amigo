package com.climaamigo.app.Services;

import com.climaamigo.app.Models.Mantenimientos;
import com.climaamigo.app.Repositories.MantenimientoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MantenimientoService {

    private static final String ESTADO_POR_DEFECTO = "PENDIENTE";

    private final MantenimientoRepository mantenimientoRepository;

    public MantenimientoService(MantenimientoRepository mantenimientoRepository) {
        this.mantenimientoRepository = mantenimientoRepository;
    }

    public List<Mantenimientos> listarMantenimientos() {
        return mantenimientoRepository.findAll();
    }

    public Optional<Mantenimientos> obtenerPorId(Long id) {
        return mantenimientoRepository.findById(id);
    }

    public Mantenimientos guardar(Mantenimientos mantenimiento) {
        mantenimiento.setId(null);
        normalizar(mantenimiento);
        return mantenimientoRepository.save(mantenimiento);
    }

    public Optional<Mantenimientos> actualizar(Long id, Mantenimientos datosMantenimiento) {
        return mantenimientoRepository.findById(id)
                .map(mantenimiento -> {
                    mantenimiento.setNombreCliente(datosMantenimiento.getNombreCliente());
                    mantenimiento.setDireccion(datosMantenimiento.getDireccion());
                    mantenimiento.setDescripcion(datosMantenimiento.getDescripcion());
                    mantenimiento.setMarca(datosMantenimiento.getMarca());
                    mantenimiento.setModelo(datosMantenimiento.getModelo());
                    mantenimiento.setCantidad(datosMantenimiento.getCantidad());
                    mantenimiento.setEstado(datosMantenimiento.getEstado());
                    normalizar(mantenimiento);
                    return mantenimientoRepository.save(mantenimiento);
                });
    }

    public boolean eliminar(Long id) {
        if (!mantenimientoRepository.existsById(id)) {
            return false;
        }

        mantenimientoRepository.deleteById(id);
        return true;
    }

    private void normalizar(Mantenimientos mantenimiento) {
        if (mantenimiento.getEstado() == null || mantenimiento.getEstado().isBlank()) {
            mantenimiento.setEstado(ESTADO_POR_DEFECTO);
        } else {
            mantenimiento.setEstado(mantenimiento.getEstado().trim().toUpperCase());
        }

        if (mantenimiento.getDescripcion() != null) {
            mantenimiento.setDescripcion(mantenimiento.getDescripcion().trim());
        }

        mantenimiento.setNombreCliente(mantenimiento.getNombreCliente().trim());
        mantenimiento.setDireccion(mantenimiento.getDireccion().trim());
        mantenimiento.setMarca(mantenimiento.getMarca().trim());
        mantenimiento.setModelo(mantenimiento.getModelo().trim());
    }
}
