import { getRepository, Repository } from "typeorm";

import IDoctorRepository from "@modules/doctors/repositories/models/IDoctorRepository";
import ICreateDoctorDTO from "@modules/doctors/dtos/ICreateDoctorDTO";
import { Doctor } from "../entities/Doctor";

class DoctorRepository implements IDoctorRepository {
  private ormRepository: Repository<Doctor>;

  constructor() {
    this.ormRepository = getRepository(Doctor);
  }

  public async create(doctorData: ICreateDoctorDTO): Promise<Doctor> {
    const doctor = this.ormRepository.create(doctorData);

    return this.ormRepository.save({
      ...doctor,
      active: true,
    });
  }

  public async findByEmail(email: string): Promise<Doctor | undefined> {
    const doctor = await this.ormRepository.findOne({
      where: { email, active: true },
    });

    return doctor;
  }

  async findById(doctorId: string): Promise<Doctor | undefined> {
    const doctor = await this.ormRepository.findOne({
      where: { id: doctorId, active: true },
    });

    return doctor;
  }
}

export default DoctorRepository;
