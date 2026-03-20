import { isValidKey } from "../../../shared/utils/objectUtils";

export enum UserRole {
  MASTER = "MASTER", // Nível 5
  ADMIN = "ADMIN", // Nível 4
  MANAGER = "MANAGER", // Nível 3
  SUPERVISOR = "SUPERVISOR", // Nível 2
  EMPLOYEE = "EMPLOYEE", // Nível 1
}

// O master tem acesso a tudo, podendo criar, editar e deletar qualquer coisa, inclusive os admins

// O admin poder ver tudo que esta relacionado a o seu departamento
// e os departamentos abaixo do departamento dele, podendo alterar valores importantes das empresas

// Manager poder ver tudo que esta relacionado a o seu departamento
// e os departamentos abaixo do departamento dele, não podendo alterar valores importantes das empresas

// Supervisor pode ver tudo que esta relacionar a o seu derpartamento

// Employe vai ver somente o seu trabalho

const RoleWeight: Record<UserRole, number> = {
  [UserRole.MASTER]: 5,
  [UserRole.ADMIN]: 4,
  [UserRole.MANAGER]: 3,
  [UserRole.SUPERVISOR]: 2,
  [UserRole.EMPLOYEE]: 1,
};

type RoleInput = {
  name: string;
  level: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Role {
  constructor(
    private name: string,
    private level: number,
    private createdAt: Date = new Date(),
    private updatedAt: Date = new Date(),
  ) {}

  static from(props: RoleInput): Role {
    const isValidName = isValidKey(UserRole, props.name)
    if (!isValidName) {
      throw new Error(`Invalid user role`);
    }
    return new Role(
        props.name, 
        RoleWeight[props.name as UserRole],
        props.createdAt,
        props.updatedAt
    );
  }

  get getLevel(): number {
    return this.level;
  }
  get getName() {
    return this.name;
  }
  instance() {
    return this;
  }
}

export class MasterRole extends Role {
  constructor() {
    super(UserRole.MASTER, RoleWeight[UserRole.MASTER]);
  }
}

export class AdminRole extends Role {
  constructor() {
    super(UserRole.ADMIN, RoleWeight[UserRole.ADMIN]);
  }
}

export class ManagerRole extends Role {
  constructor() {
    super(UserRole.MANAGER, RoleWeight[UserRole.MANAGER]);
  }
}

export class SupervisorRole extends Role {
  constructor() {
    super(UserRole.SUPERVISOR, RoleWeight[UserRole.SUPERVISOR]);
  }
}

export class EmployeeRole extends Role {
  constructor() {
    super(UserRole.EMPLOYEE, RoleWeight[UserRole.EMPLOYEE]);
  }
}
