import { UserRepository, EmpresaRepository, LoteRepository } from "../../application/IncentiveApplication";
/**
 * Ejemplo de importación si usas el paquete 'pg' directamente:
 * import { Pool } from "pg";
 * const pool = new Pool({...});
 */

/**
 * src/infrastructure/repositories/IncentiveRepository.ts
 * * Implementación de los adaptadores para PostgreSQL.
 */

export class PostgresUserRepository implements UserRepository {
  /**
   * Obtiene el rol del usuario desde Postgres.
   */
  async getUserRole(userId: number): Promise<string | null> {
    /**
     * Ejemplo con 'pg':
     * const query = 'SELECT role FROM users WHERE id = $1';
     * const { rows } = await pool.query(query, [userId]);
     * return rows[0]?.role || null;
     */
    
    return "empresa"; // Simulación para pruebas
  }
}

export class PostgresEmpresaRepository implements EmpresaRepository {
  /**
   * Consulta los datos fiscales en la tabla de empresas.
   */
  async findByUserId(userId: number): Promise<{ pagoAnualTributario: number } | null> {
    /**
     * Ejemplo con 'pg':
     * const query = 'SELECT "pagoAnualTributario" FROM empresas WHERE id_user = $1';
     * const { rows } = await pool.query(query, [userId]);
     * return rows[0] || null;
     */

    return { pagoAnualTributario: 10000000 }; // Simulación
  }
}

export class PostgresLoteRepository implements LoteRepository {
  /**
   * Obtiene la sumatoria de costos agrupados por clasificación usando sintaxis de Postgres.
   */
  async getDonationsGroupedByClassification(userId: number, year: number): Promise<{ amount: number; classification: string }[]> {
    /**
     * SQL para Postgres:
     * SELECT SUM(costo) as amount, clasificacion as classification 
     * FROM lotes 
     * WHERE id_user = $1 AND EXTRACT(YEAR FROM fecha_donacion) = $2
     * GROUP BY clasificacion
     */
    
    return [
      { amount: 500000, classification: 'P' },
      { amount: 300000, classification: 'N' },
      { amount: 200000, classification: 'I' }
    ];
  }
}