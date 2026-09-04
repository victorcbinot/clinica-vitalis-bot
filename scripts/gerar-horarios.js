// Gera horários disponíveis para os próximos dias úteis, para cada médico da clínica.
// Usado no workflow "Gerar Agenda Automática" (nó Code), rodando semanalmente via Schedule Trigger.

const medicos = [
  { nome: "Dr. Marcelo Andrade", especialidade: "Clínico Geral" },
  { nome: "Dra. Beatriz Nogueira", especialidade: "Pediatria" },
  { nome: "Dr. Rafael Costa", especialidade: "Dermatologia" },
  { nome: "Dra. Helena Duarte", especialidade: "Cardiologia" },
  { nome: "Dr. Thiago Barbosa", especialidade: "Ortopedia" },
];

const horarios = ["09:00", "11:30", "14:00", "15:30"];
const diasUteisAFrente = 10;

function formatarData(date) {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  return `${dd}/${mm}`;
}

const resultados = [];
let dataAtual = new Date();
let diasGerados = 0;

while (diasGerados < diasUteisAFrente) {
  dataAtual.setDate(dataAtual.getDate() + 1);
  const diaSemana = dataAtual.getDay();
  if (diaSemana === 0 || diaSemana === 6) continue;

  const dataFormatada = formatarData(dataAtual);

  for (const medico of medicos) {
    for (const horario of horarios) {
      const id = `${dataFormatada.replace('/', '')}-${horario.replace(':', '')}-${medico.nome.split(' ')[1]}`;
      resultados.push({
        json: {
          ID: id,
          Data: dataFormatada,
          "Horário": horario,
          "Médico": medico.nome,
          Especialidade: medico.especialidade,
          Paciente: "",
          Telefone: "",
          Status: "Disponível"
        }
      });
    }
  }

  diasGerados++;
}

return resultados;
