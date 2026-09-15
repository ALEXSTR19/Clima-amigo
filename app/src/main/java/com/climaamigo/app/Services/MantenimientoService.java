package com.climaamigo.app.Services;

import com.climaamigo.app.Models.Inventario;
import com.climaamigo.app.Models.Mantenimientos;
import com.climaamigo.app.Repositories.MantenimientoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MantenimientoService {
    @Autowired
    private MantenimientoRepository mantenimientoRepository;

    //Listar
    public List<Mantenimientos> listarMantenimientos(){ return mantenimientoRepository.findAll();}

    public Mantenimientos obtenerPorId(Long id){
        Optional<Mantenimientos> inventario =
                mantenimientoRepository.findById(id);
        return inventario.orElse(null);
    }
    //guardar
    public Mantenimientos guardar(Mantenimientos mantenimientos) {

        actualizarEstado(Mantenimientos);

        return mantenimientoRepository.save(mantenimientos);
    }
}
