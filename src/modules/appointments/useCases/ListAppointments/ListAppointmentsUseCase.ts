import { Appointment } from "@modules/appointments/infra/typeorm/entities/Appointment";
import IAppointmentRepository from "@modules/appointments/repositories/models/IAppointmentRepository";
import IDoctorRepository from "@modules/doctors/repositories/models/IDoctorRepository";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
  doctorId: string;
  patientId: string;
}

@injectable()
class ListAppointmentsUseCase {
  constructor(
    @inject("DoctorRepository")
    private doctorRepository: IDoctorRepository,

    @inject("AppointmentRepository")
    private appointmentRepository: IAppointmentRepository
  ) {}

  async execute({ doctorId, patientId }: IRequest): Promise<Appointment[]> {
    const doctor = await this.doctorRepository.findById(doctorId);

    if (!doctor) {
      throw new AppError("Doctor not found!");
    }

    const appointments =
      await this.appointmentRepository.findByDoctorIdAndPatientId(
        doctorId,
        patientId
      );

    return appointments;
  }
}

export { ListAppointmentsUseCase };
