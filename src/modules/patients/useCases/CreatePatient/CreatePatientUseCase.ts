import IDoctorRepository from "@modules/doctors/repositories/models/IDoctorRepository";
import { Patient } from "@modules/patients/infra/typeorm/entities/Patient";
import IPatientRepository from "@modules/patients/repositories/models/IPatientRepository";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
  doctorId: string;
  name: string;
  phone: string;
  email: string;
  birthDate: string;
  genderId: number;
  height: number;
  weight: number;
}

@injectable()
class CreatePatientUseCase {
  constructor(
    @inject("DoctorRepository")
    private doctorRepository: IDoctorRepository,

    @inject("PatientRepository")
    private patientRepository: IPatientRepository
  ) {}

  async execute({
    doctorId,
    name,
    email,
    birthDate,
    genderId,
    height,
    phone,
    weight,
  }: IRequest): Promise<Patient> {
    const gender = await this.patientRepository.findGenderById(genderId);

    if (!gender) {
      throw new AppError("Gender not found!");
    }

    const doctor = await this.doctorRepository.findById(doctorId);

    if (!doctor) {
      throw new AppError("Doctor not found!");
    }

    const alreadyExistentPatientEmailByDoctor =
      await this.patientRepository.findByEmailAndDoctorId(email, doctorId);

    if (alreadyExistentPatientEmailByDoctor) {
      throw new AppError("Email address already used.");
    }

    const alreadyExistentPatientPhoneByDoctor =
      await this.patientRepository.findByPhoneAndDoctorId(phone, doctorId);

    if (alreadyExistentPatientPhoneByDoctor) {
      throw new AppError("Phone number already used.");
    }

    const createdPatient = await this.patientRepository.create({
      birthDate,
      doctorId,
      email,
      genderId,
      height,
      name,
      phone,
      weight,
    });

    return createdPatient;
  }
}

export { CreatePatientUseCase };
