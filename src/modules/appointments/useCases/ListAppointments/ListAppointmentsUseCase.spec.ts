import FakeDoctorRepository from "@modules/doctors/repositories/fakes/FakeDoctorRepository";
import { CreateDoctorUseCase } from "@modules/doctors/useCases/CreateDoctor/CreateDoctorUseCase";
import FakePatientRepository from "@modules/patients/repositories/fakes/FakePatientRepository";
import { GendersEnum } from "@modules/patients/types/Gender";
import { CreatePatientUseCase } from "@modules/patients/useCases/CreatePatient/CreatePatientUseCase";
import FakeHashProvider from "@shared/container/providers/HashProvider/fakes/FakeHashProvider";
import AppError from "@shared/errors/AppError";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import FakeAppointmentRepository from "@modules/appointments/repositories/fakes/FakeAppointmentRepository";
import { CreateAppointmentUseCase } from "../CreateAppointment/CreateAppointmentUseCase";
import { ListAppointmentsUseCase } from "./ListAppointmentsUseCase";

let fakeDoctorRepository: FakeDoctorRepository;
let fakePatientRepository: FakePatientRepository;
let fakeHashProvider: FakeHashProvider;
let fakeAppointmentRepository: FakeAppointmentRepository;
let createPatient: CreatePatientUseCase;
let createDoctor: CreateDoctorUseCase;
let createAppointment: CreateAppointmentUseCase;
let dateProvider: DayjsDateProvider;
let listAppointments: ListAppointmentsUseCase;

let doctorId: string;
let patientId: string;
let appointmentDate: Date;

describe("List Appointments", () => {
  beforeEach(async () => {
    fakeDoctorRepository = new FakeDoctorRepository();
    fakePatientRepository = new FakePatientRepository();
    fakeHashProvider = new FakeHashProvider();
    dateProvider = new DayjsDateProvider();
    fakeAppointmentRepository = new FakeAppointmentRepository();

    createDoctor = new CreateDoctorUseCase(
      fakeDoctorRepository,
      fakeHashProvider
    );

    createPatient = new CreatePatientUseCase(
      fakeDoctorRepository,
      fakePatientRepository
    );

    createAppointment = new CreateAppointmentUseCase(
      fakeDoctorRepository,
      fakeAppointmentRepository,
      fakePatientRepository,
      dateProvider
    );

    listAppointments = new ListAppointmentsUseCase(
      fakeDoctorRepository,
      fakeAppointmentRepository
    );

    const doctor = await createDoctor.execute({
      name: "Doctor john Doe",
      email: "doctorjhondoe@example.com",
      password: "example-password",
    });

    doctorId = doctor.id;

    const patient = await createPatient.execute({
      doctorId,
      birthDate: "2003-01-09",
      email: "patient-example@gmail.com",
      genderId: GendersEnum.FEMININE,
      height: 170,
      name: "Patient Example",
      phone: "48999999999",
      weight: 68.8,
    });

    patientId = patient.id;

    const currentDate = new Date();

    appointmentDate = new Date(
      `${
        currentDate.getFullYear() + 1
      }-${currentDate.getMonth()}-${currentDate.getDate()} 14:30:00`
    );
  });

  it("should be able to list appointments", async () => {
    const createdAppointment = await createAppointment.execute({
      date: appointmentDate,
      doctorId,
      patientId,
    });

    const listedAppointments = await listAppointments.execute({
      doctorId,
      patientId,
    });

    expect(listedAppointments).toStrictEqual([createdAppointment]);
  });

  it("should not be able to list appointments if doctor does not exists", async () => {
    await expect(
      listAppointments.execute({
        doctorId: "non-existent-doctor-id",
        patientId,
      })
    ).rejects.toEqual(new AppError("Doctor not found!"));
  });
});
