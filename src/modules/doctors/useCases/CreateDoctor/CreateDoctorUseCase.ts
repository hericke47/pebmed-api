import { Doctor } from "@modules/doctors/infra/typeorm/entities/Doctor";
import IDoctorRepository from "@modules/doctors/repositories/models/IDoctorRepository";
import IHashProvider from "@shared/container/providers/HashProvider/models/IHashProvider";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateDoctorUseCase {
  constructor(
    @inject("DoctorRepository")
    private doctorRepository: IDoctorRepository,

    @inject("HashProvider")
    private hashProvider: IHashProvider
  ) {}

  async execute({ name, email, password }: IRequest): Promise<Doctor> {
    const checkDoctorExists = await this.doctorRepository.findByEmail(email);

    if (checkDoctorExists) {
      throw new AppError("Email address already used.");
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const doctor = await this.doctorRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return doctor;
  }
}

export { CreateDoctorUseCase };
