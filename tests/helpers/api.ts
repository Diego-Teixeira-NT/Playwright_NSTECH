import { APIRequestContext } from '@playwright/test';

function parseJsonpResponse(text: string): any {
  const match = text.match(/^[^(]*\((.*)\);?$/s);
  const json = match ? match[1] : text;
  return JSON.parse(json);
}

const CALLBACK = 'playwrightApiTest';

export async function pesquisarUsuarioPorNomeApi(request: APIRequestContext, nome: string) {
  const grid = {
    start: 0,
    length: 50,
    order: [{ column: 0, dir: 'desc' }],
    draw: 1,
    group: { enable: false, propAgrupa: '', dirOrdena: 'desc' },
    header: [],
    listTabs: [],
  };

  const response = await request.post(`/Usuario/Pesquisa?callback=${CALLBACK}`, {
    form: {
      Nome: nome,
      TipoPessoa: '99',
      CPF: '',
      Usuario: '',
      PerfilAcesso: '0',
      Ativo: '1',
      Tipo: '1',
      NumeroMatricula: '',
      CodigoIntegracao: '',
      Localidade: '0',
      Grid: JSON.stringify(grid),
    },
  });

  const body = parseJsonpResponse(await response.text());
  return body.Data.data as Array<{ Codigo: string; Nome: string }>;
}

export async function buscarCodigoUsuarioPorNomeApi(request: APIRequestContext, nome: string) {
  const registros = await pesquisarUsuarioPorNomeApi(request, nome);
  return registros.length > 0 ? Number(registros[0].Codigo) : null;
}

function montarPayloadUsuarioCPF(opts: {
  codigo: number;
  nome: string;
  cpf: string;
  login: string;
  email: string;
  senha?: string;
}) {
  return {
    Codigo: String(opts.codigo),
    Status: 'A',
    Nome: opts.nome,
    TipoPessoa: '0',
    CPF: opts.cpf,
    RG: '',
    Telefone: '',
    DataNascimento: '',
    DataAdmissao: '',
    DataFimPeriodoExperiencia: '',
    DataDemissao: '',
    NumeroCTPS: '',
    SerieCTPS: '',
    Salario: '',
    CodigoIntegracao: '',
    Filial: '0',
    SetorFuncionario: '0',
    Turno: '0',
    CargoSetorTurno: '0',
    CentroDeCustoSetorTurno: '0',
    NivelEscalationList: '0',
    ClienteSetor: '[]',
    Localidade: '0',
    Endereco: '',
    Bairro: '',
    CEP: '',
    Complemento: '',
    NumeroEndereco: 'S/N',
    TipoLogradouro: '1',
    EnderecoDigitado: 'false',
    SN_Numero: 'false',
    ConsultarCEP: '0',
    Latitude: '',
    Longitude: '',
    Email: opts.email,
    NotificadoExpedicao: 'true',
    NotificacaoPorEmail: 'true',
    AssociarUsuarioCliente: 'false',
    UsuarioMobile: 'false',
    ExigeContraSenha: 'false',
    ContraSenhaMobile: '',
    Cliente: '0',
    PlanoConta: '0',
    TipoMovimentoComissao: '0',
    DiaComissao: '0',
    Operador: 'false',
    OperadorSupervisor: 'false',
    PermiteAdicionarComplementosDeFrete: 'false',
    PermitirVisualizarValorFreteTransportadoresInteressadosCarga: 'true',
    PermitirAssumirCargasControleEntrega: 'true',
    UsuarioAcessoBloqueado: 'false',
    LiberarAuditoria: 'false',
    ExibirUsuarioAprovacao: 'true',
    LimitarOperacaoPorEmpresa: 'false',
    Login: opts.login,
    Senha: opts.senha ?? '',
    SituacaoColaborador: '6',
    PISAdministrativo: '',
    Cargo: '',
    CBO: '',
    NumeroMatricula: '',
    Observacao: '',
    TituloEleitoral: '',
    ZonaEleitoral: '',
    SecaoEleitoral: '',
    DataExpedicaoCTPS: '',
    EstadoCivil: '0',
    CorRaca: '0',
    Escolaridade: '0',
    TipoComercial: '',
    TipoComercialCheck: 'false',
    EstadoCTPS: '0',
    Gerente: '0',
    Supervisor: '0',
    LocalidadeNascimento: '0',
    NotificarOcorrenciaEntrega: 'false',
    PermiteAssumirOcorrencia: 'false',
    Aposentadoria: '0',
    FormaAutenticacaoUsuario: '',
    AreaContainer: '0',
    PermiteInserirDicas: 'false',
    PermitirAprovarNaoConformidade: 'false',
    NotificarEtapasBidding: 'false',
    PermitirAssumirAtendimentoManeiraSobreposta: 'false',
    UsuarioAtendimento: 'false',
    UsuarioCallCenter: 'false',
    UsuarioMultisoftware: 'false',
    UsuarioUtilizaSegregacaoPorProvedor: 'false',
    PerfilAcesso: '0',
    FormulariosUsuario: '[]',
    ModulosUsuario: '[]',
    HoraInicialAcesso: '',
    HoraFinalAcesso: '',
    UsuarioAdministrador: 'false',
    PermiteSalvarNovoRelatorio: 'false',
    PermiteTornarRelatorioPadrao: 'false',
    PermiteSalvarConfiguracoesRelatoriosParaTodos: 'false',
    VisualizarGraficosIniciais: 'false',
    VisualizarTitulosPagamentoSalario: 'false',
    VisualizarControleDashRegiaoOperador: 'false',
    RegiaoNorte: 'false',
    RegiaoNordeste: 'false',
    RegiaoSul: 'false',
    RegiaoSudeste: 'false',
    RegiaoCentroOeste: 'false',
    PerfilAcessoMobile: '0',
    FormulariosUsuarioMobile: '[]',
    ModulosUsuarioMobile: '[]',
    UsuarioAdministradorMobile: 'true',
    CodigoLicenca: '0',
    Descricao: '',
    Numero: '',
    DataEmissao: '',
    DataVencimento: '',
    FormaAlerta: '[]',
    StatusLicenca: '1',
    Licenca: '0',
    GridUsuarioLicencas: '[]',
    GridUsuarioDadoBancarios: '[]',
    CodigoDadoBancario: '0',
    BancoDadoBancario: '0',
    AgenciaDadoBancario: '',
    DigitoDadoBancario: '',
    NumeroContaDadoBancario: '',
    TipoContaDadoBancario: '1',
    ObservacaoContaDadoBancario: '',
    FotoUsuario: '',
    GridUsuarioContatos: '[]',
    NomeContato: '',
    TelefoneContato: '',
    EmailContato: '',
    TipoParentescoContato: '0',
    CodigoContato: '0',
    CPFContato: '',
    DataNascimentoContato: '',
    Empresas: '[]',
    GridRepresentacoes: '[]',
    CentrosResultado: '[]',
    GridEPIs: '[]',
    CodigoEPI: '0',
    EPI: '0',
    DataRepasse: '',
    SerieEPI: '',
    Quantidade: '0',
    GridMetas: '[]',
    CodigoMeta: '0',
    DataInicialMeta: '',
    DataFinalMeta: '',
    PercentualMeta: '0',
    TipoMetaVendaDireta: '1',
    StatusMeta: 'true',
    ProvedoresUsuarios: '[]',
  };
}

export async function cadastrarUsuarioCPFApi(
  request: APIRequestContext,
  nome: string,
  cpf: string,
  login: string,
  email: string
) {
  const payload = montarPayloadUsuarioCPF({
    codigo: 0,
    nome,
    cpf,
    login,
    email,
    senha: 'Senha@123',
  });

  const response = await request.post(`/Usuario/Adicionar?callback=${CALLBACK}`, {
    form: payload,
  });

  const body = parseJsonpResponse(await response.text());
  if (!body.Success || body.Data !== true) {
    throw new Error(`Falha ao cadastrar usuário via API: ${JSON.stringify(body)}`);
  }
}

export async function editarUsuarioCPFApi(
  request: APIRequestContext,
  codigo: number,
  nomeAtualizado: string,
  cpf: string,
  login: string,
  email: string
) {
  const payload = montarPayloadUsuarioCPF({
    codigo,
    nome: nomeAtualizado,
    cpf,
    login,
    email,
  });

  const response = await request.post(`/Usuario/Atualizar?callback=${CALLBACK}`, {
    form: payload,
  });

  const body = parseJsonpResponse(await response.text());
  if (!body.Success || body.Data !== true) {
    throw new Error(`Falha ao editar usuário via API: ${JSON.stringify(body)}`);
  }
}

export async function excluirUsuarioPorCodigoApi(request: APIRequestContext, codigo: number) {
  const response = await request.post(`/Usuario/ExcluirPorCodigo?callback=${CALLBACK}`, {
    form: { Codigo: String(codigo) },
  });

  const body = parseJsonpResponse(await response.text());
  if (!body.Success) {
    throw new Error(`Falha ao excluir usuário via API: ${JSON.stringify(body)}`);
  }
}

export async function limparUsuarioCPFApi(request: APIRequestContext, nome: string) {
  let codigo = await buscarCodigoUsuarioPorNomeApi(request, nome);
  while (codigo !== null) {
    await excluirUsuarioPorCodigoApi(request, codigo);
    codigo = await buscarCodigoUsuarioPorNomeApi(request, nome);
  }
}
