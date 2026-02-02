import { useState, useRef } from 'react';
import { 
  X,
  User,
  Mail,
  Phone,
  Calendar,
  BookOpen,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  FileText,
  Upload,
  Loader2,
  CreditCard,
  Briefcase,
} from 'lucide-react';

interface AddStudentWizardProps {
  onClose: () => void;
}

export function AddStudentWizard({ onClose }: AddStudentWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    birthDate: '',
    cpf: '',
    rg: '',
    profissao: '',
    level: '',
    courses: [] as string[],
    notes: '',
    contractUrl: '' as string,
  });
  const [contractFile, setContractFile] = useState<File | null>(null);
  const [contractFileName, setContractFileName] = useState('');
  const [uploadingContract, setUploadingContract] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const contractInputRef = useRef<HTMLInputElement>(null);

  const handleContractChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setContractFile(null);
      setContractFileName('');
      setFormData((f) => ({ ...f, contractUrl: '' }));
      return;
    }
    setContractFile(file);
    setContractFileName(file.name);
    setUploadingContract(true);
    try {
      const { uploadFile } = await import('../../../api/upload');
      const res = await uploadFile(file);
      setFormData((f) => ({ ...f, contractUrl: res.url }));
    } catch {
      setFormData((f) => ({ ...f, contractUrl: '' }));
    } finally {
      setUploadingContract(false);
    }
  };

  const steps = [
    { id: 1, title: 'Informações Pessoais', icon: User },
    { id: 2, title: 'Nível e Cursos', icon: BookOpen },
    { id: 3, title: 'Confirmação', icon: CheckCircle }
  ];

  const availableCourses = [
    { id: 'a1', name: 'A1 - Beginner', level: 'A1' },
    { id: 'a2', name: 'A2 - Elementary', level: 'A2' },
    { id: 'b1', name: 'B1 - Intermediate', level: 'B1' },
    { id: 'b2', name: 'B2-C1 - Advanced', level: 'B2' },
    { id: 'conv1', name: 'Conversation 1', level: 'Conv' },
    { id: 'conv2', name: 'Conversation 2', level: 'Conv' },
    { id: 'business', name: 'Business English', level: 'Business' },
    { id: 'travel', name: 'Travel English', level: 'Special' },
  ];

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Mock: in production would call API to create student and send email with setup link
    setSubmitted(true);
  };

  const setupLink = typeof window !== 'undefined' ? `${window.location.origin}/app/setup-profile?token=test` : '/app/setup-profile?token=test';
  const openTestSetupLink = () => window.open(setupLink, '_blank');

  const toggleCourse = (courseId: string) => {
    setFormData(prev => ({
      ...prev,
      courses: prev.courses.includes(courseId)
        ? prev.courses.filter(id => id !== courseId)
        : [...prev.courses, courseId]
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#253439] to-[#7c898b] p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Adicionar Novo Aluno</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-white/20 rounded-lg hover:bg-white/30 transition-colors flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all ${
                      isActive 
                        ? 'bg-[#fbb80f] text-white scale-110' 
                        : isCompleted
                        ? 'bg-white text-[#253439]'
                        : 'bg-white/20 text-white/60'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </div>
                    <span className={`text-xs text-center ${isActive || isCompleted ? 'text-white' : 'text-white/60'}`}>
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`h-0.5 flex-1 mx-2 ${isCompleted ? 'bg-white' : 'bg-white/20'}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#253439] mb-2">
                  Nome Completo *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#7c898b]" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Digite o nome completo do aluno"
                    className="w-full pl-10 pr-4 py-3 border border-[#b29e84]/30 rounded-lg focus:outline-none focus:border-[#fbb80f] text-[#253439]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#253439] mb-2">
                  Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#7c898b]" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@exemplo.com"
                    className="w-full pl-10 pr-4 py-3 border border-[#b29e84]/30 rounded-lg focus:outline-none focus:border-[#fbb80f] text-[#253439]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#253439] mb-2">
                    Telefone *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#7c898b]" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(11) 98765-4321"
                      className="w-full pl-10 pr-4 py-3 border border-[#b29e84]/30 rounded-lg focus:outline-none focus:border-[#fbb80f] text-[#253439]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#253439] mb-2">
                    Data de Nascimento
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#7c898b]" />
                    <input
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-[#b29e84]/30 rounded-lg focus:outline-none focus:border-[#fbb80f] text-[#253439]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#253439] mb-2">
                    CPF
                  </label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#7c898b]" />
                    <input
                      type="text"
                      value={formData.cpf}
                      onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                      placeholder="000.000.000-00"
                      maxLength={14}
                      className="w-full pl-10 pr-4 py-3 border border-[#b29e84]/30 rounded-lg focus:outline-none focus:border-[#fbb80f] text-[#253439]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#253439] mb-2">
                    RG
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#7c898b]" />
                    <input
                      type="text"
                      value={formData.rg}
                      onChange={(e) => setFormData({ ...formData, rg: e.target.value })}
                      placeholder="Número do RG"
                      className="w-full pl-10 pr-4 py-3 border border-[#b29e84]/30 rounded-lg focus:outline-none focus:border-[#fbb80f] text-[#253439]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#253439] mb-2">
                  Profissão
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#7c898b]" />
                  <input
                    type="text"
                    value={formData.profissao}
                    onChange={(e) => setFormData({ ...formData, profissao: e.target.value })}
                    placeholder="Ex.: Engenheiro, Professor, Médico"
                    className="w-full pl-10 pr-4 py-3 border border-[#b29e84]/30 rounded-lg focus:outline-none focus:border-[#fbb80f] text-[#253439]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#253439] mb-2">
                  Observações
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Adicione observações sobre o aluno (opcional)"
                  rows={3}
                  className="w-full px-4 py-3 border border-[#b29e84]/30 rounded-lg focus:outline-none focus:border-[#fbb80f] text-[#253439] resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#253439] mb-2">
                  Contrato assinado (opcional)
                </label>
                <p className="text-xs text-[#7c898b] mb-2">
                  Anexe o contrato assinado do aluno (PDF ou imagem).
                </p>
                <input
                  ref={contractInputRef}
                  type="file"
                  accept=".pdf,image/*"
                  className="hidden"
                  onChange={handleContractChange}
                />
                {!contractFileName ? (
                  <button
                    type="button"
                    onClick={() => contractInputRef.current?.click()}
                    disabled={uploadingContract}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-[#b29e84]/30 rounded-lg text-[#7c898b] hover:border-[#fbb80f] hover:bg-[#fbb80f]/5 hover:text-[#253439] transition-colors"
                  >
                    {uploadingContract ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <Upload className="w-5 h-5" />
                        <span>Selecionar arquivo</span>
                      </>
                    )}
                  </button>
                ) : (
                  <div className="flex items-center gap-3 p-3 bg-[#f6f4f1] rounded-lg border border-[#b29e84]/20">
                    <FileText className="w-5 h-5 text-[#fbb80f] flex-shrink-0" />
                    <span className="flex-1 text-sm font-medium text-[#253439] truncate" title={contractFileName}>
                      {contractFileName}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setContractFile(null);
                        setContractFileName('');
                        setFormData((f) => ({ ...f, contractUrl: '' }));
                        if (contractInputRef.current) contractInputRef.current.value = '';
                      }}
                      className="text-sm text-[#7c898b] hover:text-red-600"
                    >
                      Remover
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Level and Courses */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#253439] mb-2">
                  Nível do Aluno *
                </label>
                <select
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                  className="w-full px-4 py-3 border border-[#b29e84]/30 rounded-lg focus:outline-none focus:border-[#fbb80f] text-[#253439] bg-white"
                >
                  <option value="">Selecione o nível</option>
                  <option value="A1">A1 - Beginner</option>
                  <option value="A2">A2 - Elementary</option>
                  <option value="B1">B1 - Intermediate</option>
                  <option value="B2">B2 - Upper Intermediate</option>
                  <option value="C1">C1 - Advanced</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#253439] mb-3">
                  Cursos para Inscrever *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {availableCourses.map((course) => {
                    const isSelected = formData.courses.includes(course.id);
                    return (
                      <button
                        key={course.id}
                        onClick={() => toggleCourse(course.id)}
                        className={`p-4 rounded-lg border-2 text-left transition-all ${
                          isSelected
                            ? 'border-[#fbb80f] bg-[#fbb80f]/10'
                            : 'border-[#b29e84]/30 hover:border-[#b29e84]'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className={`font-medium mb-1 ${isSelected ? 'text-[#fbb80f]' : 'text-[#253439]'}`}>
                              {course.name}
                            </p>
                            <span className="text-xs text-[#7c898b]">{course.level}</span>
                          </div>
                          {isSelected && (
                            <CheckCircle className="w-5 h-5 text-[#fbb80f]" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="bg-[#fbb80f]/10 border border-[#fbb80f]/30 rounded-lg p-4">
                <p className="text-sm text-[#253439]">
                  <strong>Dica:</strong> Você pode inscrever o aluno em múltiplos cursos. 
                  Selecione todos os cursos relevantes para o nível dele.
                </p>
              </div>
            </div>
          )}

          {/* Success: after submit */}
          {submitted && (
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 bg-[#fbb80f]/20 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-[#fbb80f]" />
              </div>
              <h3 className="text-xl font-semibold text-[#253439]">Aluno adicionado com sucesso</h3>
              <p className="text-[#7c898b] text-sm">
                Um e-mail de ativação foi enviado para <strong className="text-[#253439]">{formData.email}</strong>. 
                O aluno pode acessar o link no e-mail para criar a senha e completar o perfil.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                <button
                  type="button"
                  onClick={openTestSetupLink}
                  className="px-6 py-3 rounded-lg border-2 border-[#fbb80f] text-[#fbb80f] font-medium hover:bg-[#fbb80f]/10 transition-colors"
                >
                  Testar link de ativação
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 rounded-lg bg-[#fbb80f] text-white font-medium hover:bg-[#253439] transition-colors"
                >
                  Fechar
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {!submitted && currentStep === 3 && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-[#fbb80f]/10 to-[#fbee0f]/10 border border-[#fbb80f]/30 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-[#253439] mb-4">Resumo do Cadastro</h3>
                
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-[#7c898b] mb-1">Nome</p>
                      <p className="font-medium text-[#253439]">{formData.name || '-'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#7c898b] mb-1">Email</p>
                      <p className="font-medium text-[#253439]">{formData.email || '-'}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-[#7c898b] mb-1">Telefone</p>
                      <p className="font-medium text-[#253439]">{formData.phone || '-'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#7c898b] mb-1">Data de Nascimento</p>
                      <p className="font-medium text-[#253439]">
                        {formData.birthDate ? new Date(formData.birthDate).toLocaleDateString('pt-BR') : '-'}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-[#7c898b] mb-1">CPF</p>
                      <p className="font-medium text-[#253439]">{formData.cpf || '-'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#7c898b] mb-1">RG</p>
                      <p className="font-medium text-[#253439]">{formData.rg || '-'}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-[#7c898b] mb-1">Profissão</p>
                    <p className="font-medium text-[#253439]">{formData.profissao || '-'}</p>
                  </div>

                  <div>
                    <p className="text-sm text-[#7c898b] mb-1">Nível</p>
                    <p className="font-medium text-[#253439]">{formData.level || '-'}</p>
                  </div>

                  <div>
                    <p className="text-sm text-[#7c898b] mb-2">Cursos Selecionados</p>
                    <div className="flex flex-wrap gap-2">
                      {formData.courses.length > 0 ? (
                        formData.courses.map((courseId) => {
                          const course = availableCourses.find(c => c.id === courseId);
                          return (
                            <span key={courseId} className="bg-[#fbb80f] text-white px-3 py-1 rounded-full text-sm">
                              {course?.name}
                            </span>
                          );
                        })
                      ) : (
                        <span className="text-[#7c898b]">Nenhum curso selecionado</span>
                      )}
                    </div>
                  </div>

                  {formData.notes && (
                    <div>
                      <p className="text-sm text-[#7c898b] mb-1">Observações</p>
                      <p className="font-medium text-[#253439]">{formData.notes}</p>
                    </div>
                  )}

                  <div>
                    <p className="text-sm text-[#7c898b] mb-1">Contrato</p>
                    <p className="font-medium text-[#253439]">
                      {contractFileName || formData.contractUrl ? (
                        <span className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-[#fbb80f]" />
                          {contractFileName || 'Anexado'}
                        </span>
                      ) : (
                        'Não anexado'
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#fbee0f]/10 border border-[#fbee0f]/30 rounded-lg p-4">
                <p className="text-sm text-[#253439]">
                  ✅ Ao confirmar, o aluno receberá um email de boas-vindas com instruções de acesso à plataforma.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {!submitted && (
        <div className="border-t border-[#b29e84]/20 p-4 sm:p-6 bg-[#f6f4f1]">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`px-4 sm:px-6 py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors ${
                currentStep === 1
                  ? 'text-[#7c898b] cursor-not-allowed'
                  : 'text-[#253439] hover:bg-white'
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar
            </button>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 sm:flex-none px-4 sm:px-6 py-2.5 rounded-lg font-medium text-[#7c898b] hover:bg-white transition-colors"
              >
                Cancelar
              </button>
              
              {currentStep < 3 ? (
                <button
                  onClick={handleNext}
                  className="flex-1 sm:flex-none bg-[#fbb80f] text-white px-4 sm:px-6 py-2.5 rounded-lg hover:bg-[#253439] transition-colors font-medium flex items-center justify-center gap-2"
                >
                  Próximo
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="flex-1 sm:flex-none bg-[#fbb80f] text-white px-4 sm:px-6 py-2.5 rounded-lg hover:bg-[#253439] transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span className="hidden sm:inline">Confirmar Cadastro</span>
                  <span className="sm:hidden">Confirmar</span>
                </button>
              )}
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}