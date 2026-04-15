import React, { useState, useEffect } from 'react';
import { Home, CheckCircle2, XCircle, Clock, Calendar, ChevronRight, AlertCircle, BookOpen, RotateCcw, Award } from 'lucide-react';

// 카테고리 매핑 (데이터 용량 최적화를 위해 숫자로 관리)
const chapters = {
  1: '[제1장] 행정의 개념과 성격',
  2: '[제2장] 행정 가치',
  3: '[제3장] 행정학의 유래 (미국 초기)',
  4: '[제4장] 현대 행정 이론',
  5: '[제5장] 관료제 이론',
  6: '[제6장] 정부 조직과 지방자치',
  7: '[제7장] 조직론과 동기부여'
};

const diffs = { 1: '하', 2: '중', 3: '상' };

// 150문제 완벽 탑재 (c: 챕터, d: 난이도, a: 정답, q: 문제, e: 해설)
const questionData = [
  // 제1장 (1~20)
  { c: 1, d: 1, a: 'O', q: '협의(좁은 의미)의 행정은 정부 관료제를 중심으로 이루어지는 공적인 활동만을 의미한다.', e: '협의의 행정은 정부 기관의 활동에만 국한하여 파악합니다.' },
  { c: 1, d: 2, a: 'X', q: '광의(넓은 의미)의 행정은 정부뿐만 아니라 민간 기업이나 시민단체의 합리적 협동 행위를 포함하지 않는다.', e: '광의의 행정은 공동 목표 달성을 위한 모든 합리적 협동 행위를 포함합니다.' },
  { c: 1, d: 3, a: 'X', q: '거버넌스 시대에는 행정과 경영, 즉 공공부문과 민간부문의 경계가 점차 뚜렷해지고 있다.', e: '협력적 네트워크가 강조되면서 공공과 민간의 경계가 모호해지고 있습니다.' },
  { c: 1, d: 1, a: 'O', q: '행정과 경영은 모두 주어진 목표를 달성하기 위해 인적, 물적 자원을 효율적으로 관리한다는 공통점이 있다.', e: '관리(Management)적 측면에서 두 분야는 유사성을 지닙니다.' },
  { c: 1, d: 2, a: 'X', q: '행정은 경영에 비해 법적 규제를 덜 받으며 탄력적인 운영이 가능하다.', e: '행정은 공권력을 행사하므로 경영보다 훨씬 엄격한 법적 통제를 받습니다.' },
  { c: 1, d: 1, a: 'O', q: '경영의 궁극적 목적이 이윤 추구(사익)라면, 행정의 궁극적 목적은 공익(Public Interest)의 실현이다.', e: '목적하는 핵심 가치가 사익이냐 공익이냐의 차이입니다.' },
  { c: 1, d: 1, a: 'O', q: '행정은 경영과 달리 국민에게 권력을 행사할 수 있는 강제력을 지닌다.', e: '조세 징수 등 합법적인 공권력을 가지고 있습니다.' },
  { c: 1, d: 2, a: 'X', q: '정치-행정 이원론은 행정이 정치적 결정 과정에 적극적으로 개입해야 한다고 주장한다.', e: '이원론은 정치는 결정, 행정은 집행으로 엄격히 분리해야 한다고 봅니다.' },
  { c: 1, d: 2, a: 'O', q: '행정학은 정치학, 경제학, 사회학 등 다양한 학문 분야의 지식을 활용하는 종합학문적 성격을 띤다.', e: '복잡한 사회 문제 해결을 위해 인접 학문의 지식을 융합합니다.' },
  { c: 1, d: 3, a: 'O', q: '모든 조직은 공공성의 정도에 따라 0에서 100까지 연속선상에 놓일 수 있으며 사기업도 공공성을 가질 수 있다.', e: '이분법이 아닌 공공성의 연속선 개념으로 파악합니다.' },
  { c: 1, d: 3, a: 'X', q: '행정 국가는 국회의 입법권보다 행정부의 역할과 권한이 상대적으로 축소된 국가를 의미한다.', e: '행정 국가는 복잡한 문제 해결을 위해 행정부의 권한이 커진 국가입니다.' },
  { c: 1, d: 3, a: 'X', q: '실증적 접근 방법은 행정 현상에서 가치 판단의 영역을 핵심 연구 대상으로 삼는다.', e: '사이먼의 실증적 접근은 검증 불가능한 가치를 배제하고 사실만을 연구합니다.' },
  { c: 1, d: 2, a: 'X', q: '협의의 행정 개념에 따르면, 대학교 동아리에서 회장이 부원들을 이끌고 행사를 기획하는 것도 행정이다.', e: '동아리 활동은 정부 활동이 아니므로 협의의 행정에는 속하지 않습니다.' },
  { c: 1, d: 1, a: 'O', q: '행정은 원칙적으로 모든 국민을 평등하게 대우해야 하는 평등성을 중시한다.', e: '고객을 차별하는 경영과 달리 행정은 보편성과 평등성을 지닙니다.' },
  { c: 1, d: 2, a: 'X', q: '행정은 경영에 비해 성과를 측정하고 평가하는 기준이 매우 명확하다.', e: '경영은 이윤이라는 기준이 명확하지만, 행정은 공익 등 목표가 추상적입니다.' },
  { c: 1, d: 2, a: 'X', q: '공공 문제의 해결은 오직 정부의 독점적 권한이며 민간은 참여할 수 없다.', e: '거버넌스 체제에서는 민간과 시민사회도 적극 참여합니다.' },
  { c: 1, d: 2, a: 'O', q: '초기 행정학은 행정의 관리적, 기술적 측면을 강조하며 능률성을 최고의 가치로 삼았다.', e: '초기 행정학은 능률 지상주의를 표방했습니다.' },
  { c: 1, d: 2, a: 'O', q: '현대 행정은 집행 기능뿐만 아니라 목표를 설정하고 정책을 결정하는 정치적 기능도 함께 수행한다.', e: '이를 정치-행정 일원론적 성격이라고 합니다.' },
  { c: 1, d: 1, a: 'O', q: '행정은 대공황 등 시장 실패를 교정하기 위해 정부가 개입하면서 그 역할이 확대되었다.', e: '시장 실패가 큰 정부를 부르는 결정적 계기가 되었습니다.' },
  { c: 1, d: 1, a: 'O', q: '정부 활동 중 일부만 행정이라고 보는 학자도 있고 전체를 행정으로 보는 학자도 있다.', e: '학자마다 행정을 정의하는 범위가 다를 수 있습니다.' },

  // 제2장 (21~40)
  { c: 2, d: 2, a: 'X', q: '공익의 실체설은 공익을 사익의 단순한 합산으로 파악한다.', e: '사익의 합산으로 보는 것은 과정설입니다.' },
  { c: 2, d: 1, a: 'O', q: '공익의 과정설에 따르면 다양한 집단 간의 타협과 조정을 통해 형성된 결과물이 곧 공익이다.', e: '과정설은 민주적 의사결정 과정을 통해 공익이 도출된다고 봅니다.' },
  { c: 2, d: 3, a: 'O', q: '실체설은 국가나 엘리트가 공익을 일방적으로 규정하여 전체주의로 전락할 위험이 있다.', e: '실체설은 절대적 공익을 강조하여 독재에 악용될 소지가 있습니다.' },
  { c: 2, d: 2, a: 'O', q: '과정설은 사회적 약자나 소수자의 이익이 다수결에 의해 무시될 수 있다는 단점이 있다.', e: '힘 있는 집단의 이익만 대변될 위험(집단 이기주의)이 있습니다.' },
  { c: 2, d: 2, a: 'O', q: '다원주의 사회에서는 실체설보다는 과정설이 공익을 설명하는 데 더 적합하다.', e: '이해관계가 충돌하는 현대 민주주의는 타협을 중시하는 과정설과 부합합니다.' },
  { c: 2, d: 1, a: 'O', q: '기계적 능률성은 투입 대비 산출의 비율을 의미하는 단기적이고 산술적인 개념이다.', e: '비용을 최소화하는 전통적인 능률성 개념입니다.' },
  { c: 2, d: 2, a: 'X', q: '수평적 형평성은 다른 것은 다르게 취급하여 실질적인 평등을 이루려는 가치이다.', e: '다른 것을 다르게 취급하는 것은 수직적 형평성입니다.' },
  { c: 2, d: 3, a: 'O', q: '행정 책임은 법에 명시된 제도적 책임뿐만 아니라 공무원의 내면적, 자율적 책임까지 포괄한다.', e: '행정 책임은 외부적 통제와 내부적 양심을 모두 포함합니다.' },
  { c: 2, d: 1, a: 'O', q: '효과성은 투입된 비용과 무관하게 목표를 얼마나 달성했는가에 초점을 맞춘다.', e: '능률성이 수단이라면 효과성은 목표 달성 여부입니다.' },
  { c: 2, d: 2, a: 'O', q: '신행정학(NPA)의 등장으로 행정 가치 중 사회적 형평성이 크게 강조되었다.', e: '1960년대 사회 문제를 해결하기 위해 형평성이 핵심 가치로 떠올랐습니다.' },
  { c: 2, d: 1, a: 'O', q: '투명성은 행정 정보와 결정 과정을 공개하여 국민의 알 권리를 보장하는 가치이다.', e: '행정의 신뢰를 높이고 부패를 방지합니다.' },
  { c: 2, d: 3, a: 'X', q: '공익과 사익이 충돌할 경우, 과정설은 무조건 사익을 희생시켜 공익을 달성해야 한다고 본다.', e: '사익의 일방적 희생을 강요하는 것은 실체설의 관점입니다.' },
  { c: 2, d: 1, a: 'O', q: '합법성은 행정의 자의적인 권력 행사를 막고 국민의 권리를 보호하기 위한 가치이다.', e: '법치 행정의 핵심입니다.' },
  { c: 2, d: 2, a: 'O', q: '행정 통제는 행정 기관이 행정 책임을 제대로 완수하도록 감시하는 수단이다.', e: '책임성을 확보하기 위해 통제가 수반됩니다.' },
  { c: 2, d: 3, a: 'X', q: '민주성과 능률성은 항상 조화를 이루며 결코 충돌하지 않는 가치이다.', e: '민주적 절차(의견 수렴 등)는 시간이 걸려 능률성과 자주 충돌합니다.' },
  { c: 2, d: 2, a: 'O', q: '공무원의 정치적 중립성은 실적주의와 관련되며 특정 정당에 치우치지 않게 한다.', e: '모든 국민에게 공정하게 봉사하기 위한 장치입니다.' },
  { c: 2, d: 3, a: 'O', q: '수직적 형평성의 대표적 사례로는 소득이 높을수록 높은 세율을 적용하는 누진세가 있다.', e: '경제적 능력(다름)에 따라 세금을 차등(다르게) 부과합니다.' },
  { c: 2, d: 3, a: 'O', q: '절차적 합리성은 결과와 무관하게 결정을 내리는 과정 자체가 이성적이었는지를 따진다.', e: '사이먼이 강조한 인지적 한계 내에서의 합리적 절차입니다.' },
  { c: 2, d: 2, a: 'X', q: '공익은 시대와 장소, 사회적 상황에 따라 그 내용이 변하지 않는 절대적인 개념이다.', e: '공익은 시대적 요구에 따라 끊임없이 변화하는 가변적 개념입니다.' },
  { c: 2, d: 1, a: 'O', q: '행정의 반응성은 국민의 요구와 기대에 행정이 얼마나 민감하게 대응하는지를 나타낸다.', e: '민주성을 실현하는 중요한 요소입니다.' },

  // 제3장 (41~60)
  { c: 3, d: 1, a: 'O', q: '미국 건국 초기에는 강력한 중앙정부보다 주 중심의 지방분권과 작은 정부를 선호했다.', e: '영국의 억압을 피하기 위해 중앙 권력의 비대화를 경계했습니다.' },
  { c: 3, d: 2, a: 'O', q: '우드로 윌슨(Wilson)은 행정이 엽관주의의 폐해에서 벗어나 정치와 분리되어야 한다고 주장했다.', e: '행정은 비즈니스처럼 효율적으로 관리되어야 한다고 역설했습니다.' },
  { c: 3, d: 2, a: 'X', q: '테일러의 과학적 관리론은 인간을 비경제적, 감정적 유인에 의해 움직이는 존재로 가정했다.', e: '금전적 보상에 수동적으로 반응하는 경제적 인간으로 보았습니다.' },
  { c: 3, d: 1, a: 'O', q: '과학적 관리론은 업무 수행의 유일 최선의 방법(One best way)이 존재한다고 믿었다.', e: '시간과 동작 연구를 통해 가장 효율적인 방식을 찾으려 했습니다.' },
  { c: 3, d: 1, a: 'O', q: '귤릭(Gulick)의 POSDCORB는 최고 관리자가 수행해야 할 7가지 행정 관리 기능을 요약한 것이다.', e: '기획, 조직, 인사, 지휘, 조정, 보고, 예산의 앞글자입니다.' },
  { c: 3, d: 3, a: 'X', q: 'POSDCORB에서 S는 조직의 구조를 설계하는 Organizing을 의미한다.', e: 'S는 인사를 의미하는 Staffing입니다. 조직 설계는 O입니다.' },
  { c: 3, d: 1, a: 'O', q: 'POSDCORB에서 P는 목표 달성을 위한 큰 그림을 그리는 Planning(기획)을 뜻한다.', e: '계획과 기획을 의미합니다.' },
  { c: 3, d: 3, a: 'X', q: '메이요(Mayo)의 호손 실험은 물리적 작업 환경만이 생산성을 결정하는 유일한 요인임을 증명했다.', e: '오히려 심리적, 사회적 요인과 비공식 조직이 더 중요함을 밝혀냈습니다.' },
  { c: 3, d: 2, a: 'O', q: '인간관계론은 조직 내에 자생적으로 형성되는 비공식 조직의 중요성을 발견했다.', e: '비공식적인 인간관계가 성과에 큰 영향을 미친다고 보았습니다.' },
  { c: 3, d: 3, a: 'O', q: '과학적 관리론과 인간관계론은 접근법은 다르지만 조직의 생산성 향상을 목표로 한 점은 같다.', e: '둘 다 관리자 입장에서 효율성을 추구한 관리 이론입니다.' },
  { c: 3, d: 2, a: 'O', q: '윌슨의 논문은 행정학이 정치학으로부터 독립된 학문으로 인정받는 계기가 되었다.', e: '미국 행정학의 출발점으로 평가받습니다.' },
  { c: 3, d: 1, a: 'O', q: '엽관주의는 공무원 임용 시 능력보다 선거에서의 기여도나 정당 충성도를 기준으로 삼는다.', e: '선거 승리 정당이 관직을 전리품처럼 배분하는 제도입니다.' },
  { c: 3, d: 2, a: 'O', q: '미국의 진보주의 운동은 엽관주의를 타파하고 행정의 전문성을 높이려는 개혁 운동이었다.', e: '실적주의와 정치-행정 이원론의 배경이 되었습니다.' },
  { c: 3, d: 2, a: 'O', q: 'POSDCORB에서 CO는 부서 간의 업무를 엮어주는 Coordination(조정)을 뜻한다.', e: '업무의 조화로운 연계를 의미합니다.' },
  { c: 3, d: 1, a: 'O', q: 'POSDCORB에서 예산을 편성하고 통제하는 기능은 B(Budgeting)에 해당한다.', e: '예산 기능을 뜻합니다.' },
  { c: 3, d: 2, a: 'X', q: '초기 미국 행정학은 행정의 본질을 가치 판단과 고도의 정책 결정 기능으로 보았다.', e: '결정된 정책을 능률적으로 집행하는 기술적 관리로 보았습니다.' },
  { c: 3, d: 2, a: 'X', q: '테일러의 과학적 관리론은 작업자의 감정이나 사회적 소속감을 극대화하는 데 초점을 맞추었다.', e: '감정을 중시한 것은 인간관계론입니다.' },
  { c: 3, d: 1, a: 'O', q: '인간관계론은 인간을 기계 부품이 아닌 복잡한 감정을 지닌 사회적 존재로 보았다.', e: '인간적이고 감정적인 유인의 중요성을 강조했습니다.' },
  { c: 3, d: 2, a: 'O', q: '정치-행정 이원론은 공무원의 정치적 중립성을 옹호하는 이론적 배경이 되었다.', e: '정치적 간섭 배제가 중립성 확보로 이어집니다.' },
  { c: 3, d: 2, a: 'O', q: '과학적 관리론은 성과급 제도를 통해 작업자의 동기를 유발할 수 있다고 주장했다.', e: '경제적 인간관을 바탕으로 차별적 성과급을 강조했습니다.' },

  // 제4장 (61~95)
  { c: 4, d: 1, a: 'X', q: '대공황을 극복하기 위해 루즈벨트 대통령이 추진한 뉴딜 정책은 작은 정부를 지향했다.', e: '정부의 적극적 개입과 역할을 확대한 큰 정부의 상징입니다.' },
  { c: 4, d: 2, a: 'O', q: '뉴딜 정책의 3R 기조는 Recovery(회복), Reform(개혁), Relief(구제)를 의미한다.', e: '경제 위기 극복을 위한 정부의 세 가지 핵심 방향입니다.' },
  { c: 4, d: 3, a: 'O', q: '뉴딜 정책 이후 행정은 단순 집행을 넘어 스스로 정책을 결정하는 일원론적 성격으로 변했다.', e: '위기 상황에서 행정부의 전문적이고 신속한 결정이 필요해졌습니다.' },
  { c: 4, d: 2, a: 'X', q: '사이먼(Simon)의 행태주의는 행정학 연구에서 가치와 사실을 융합하여 연구해야 한다고 주장했다.', e: '가치와 사실을 엄격히 분리하고, 객관적인 사실만을 연구 대상으로 삼았습니다.' },
  { c: 4, d: 3, a: 'X', q: '사이먼은 인간이 완벽한 정보를 바탕으로 최적의 대안을 찾는 완전한 합리성을 가졌다고 전제했다.', e: '인간의 인지적 제약을 인정하는 제한된 합리성을 전제했습니다.' },
  { c: 4, d: 1, a: 'O', q: '신행정학(NPA)은 1960년대 미국의 극심한 사회 문제(빈곤, 흑인 폭동 등)를 해결하기 위해 등장했다.', e: '기존 행정학의 무능력을 비판하며 현실 참여를 촉구했습니다.' },
  { c: 4, d: 3, a: 'X', q: '왈도가 주도한 민노브룩 회의는 행태주의를 적극 지지하며 신행정학의 태동을 막았다.', e: '오히려 행태주의를 비판하며 신행정학을 탄생시킨 기념비적 회의입니다.' },
  { c: 4, d: 2, a: 'X', q: '신행정학(NPA)은 행정의 최고 가치로 기계적 능률성을 내세웠다.', e: '능률성 대신 사회적 형평성과 약자 보호를 최고 가치로 강조했습니다.' },
  { c: 4, d: 2, a: 'O', q: '신행정학은 학문이 실제 사회 문제 해결에 도움을 주어야 한다는 실천성(Relevance)을 강조했다.', e: '상아탑에 갇히지 않고 현실 문제에 처방을 내려야 한다고 보았습니다.' },
  { c: 4, d: 2, a: 'O', q: '존슨 행정부의 위대한 사회 프로그램은 빈곤 퇴치와 인권 보장을 위한 대규모 복지 정책이었다.', e: '큰 정부와 복지 국가의 정점을 보여주는 사례입니다.' },
  { c: 4, d: 2, a: 'O', q: '공공선택론은 공공 부문을 하나의 시장으로 보고, 관료도 자기 이익을 극대화하려는 존재로 가정한다.', e: '경제학의 합리적 인간 가정을 행정학에 도입했습니다.' },
  { c: 4, d: 3, a: 'O', q: '공공선택론은 서비스의 효율성을 높이기 위해 독점보다는 기관 간의 경쟁을 도입해야 한다고 주장한다.', e: '경쟁이 시민(소비자)에게 이익을 가져다준다고 보았습니다.' },
  { c: 4, d: 3, a: 'X', q: '공공선택론에 따르면 관료들은 국가 이익을 최우선으로 생각하여 예산을 삭감하려 한다.', e: '관료들도 자신의 권력을 위해 부서 예산을 극대화하려 한다고 비판했습니다.' },
  { c: 4, d: 1, a: 'O', q: '신공공관리론(NPM)은 정부 실패를 극복하기 위해 정부에 기업가적 마인드를 도입하자는 이론이다.', e: '작고 효율적이며 성과를 중시하는 정부를 지향합니다.' },
  { c: 4, d: 3, a: 'X', q: 'NPM은 방향 잡기(Steering) 기능보다 서비스를 직접 제공하는 노 젓기(Rowing)를 정부의 핵심으로 본다.', e: '집행(노 젓기)은 민간에 넘기고 정부는 방향 잡기(정책 결정)에 집중하라는 것입니다.' },
  { c: 4, d: 2, a: 'O', q: '오스본과 개블러의 정부 재창조론은 신공공관리론(NPM)의 철학을 대변한다.', e: '기업가적 정부의 원칙을 제시하며 큰 반향을 일으켰습니다.' },
  { c: 4, d: 2, a: 'O', q: '신공공관리론(NPM)은 투입이나 규칙 준수보다는 결과(Result)와 성과를 중심으로 조직을 관리한다.', e: '절차보다 산출된 성과에 책임을 묻습니다.' },
  { c: 4, d: 2, a: 'X', q: '거버넌스 이론은 정부가 시장과 시민사회 위에 군림하는 수직적 통제를 이상적으로 여긴다.', e: '정부, 시장, 시민이 협력하는 수평적 네트워크를 중시합니다.' },
  { c: 4, d: 1, a: 'O', q: '거버넌스 시대에는 공공 서비스 생산을 정부가 독점하지 않고 시민과 공동생산하기도 한다.', e: '자율방범대 등 시민의 적극적 참여가 예시입니다.' },
  { c: 4, d: 3, a: 'O', q: '거버넌스 구조에서는 다양한 주체가 개입하여 문제 발생 시 책임 소재가 불명확해질 위험이 있다.', e: '네트워크 체제의 주요 단점 중 하나입니다.' },
  { c: 4, d: 2, a: 'O', q: '신공공관리론(NPM)은 민영화, 외주화 등을 통해 정부 규모를 축소하려는 경향을 보인다.', e: '시장의 원리를 활용하여 효율성을 높이려 합니다.' },
  { c: 4, d: 2, a: 'X', q: '행태주의는 인간의 내면적 가치관이나 의도를 주요 관찰 대상으로 삼았다.', e: '행태주의는 겉으로 관찰 가능한 객관적 사실(행태)만을 연구 대상으로 삼았습니다.' },
  { c: 4, d: 2, a: 'O', q: '대공황과 뉴딜 정책은 행정이 집행만 하던 이원론에서 정책을 결정하는 일원론으로 변하는 배경이 되었다.', e: '행정의 적극적 역할이 필수적인 시대가 되었습니다.' },
  { c: 4, d: 3, a: 'X', q: '신행정학(NPA)은 행태주의의 논리실증주의를 계승하여 더욱 엄밀한 통계 분석을 추구했다.', e: '신행정학은 행태주의의 가치 중립성을 비판하며 현실 참여를 주장했습니다.' },
  { c: 4, d: 2, a: 'O', q: 'NPM과 거버넌스는 모두 큰 정부의 정부 실패 현상을 극복하기 위한 대안으로 등장했다.', e: '비효율적인 관료제 모델을 대체하려는 시대적 흐름입니다.' },
  { c: 4, d: 3, a: 'X', q: '공공선택론은 정부를 시민들에게 공공재를 독점적으로 공급하는 단일한 유기체로 보는 것을 선호한다.', e: '독점을 비판하며 공급자 간의 경쟁을 강조합니다.' },
  { c: 4, d: 2, a: 'O', q: 'NPM에서 강조하는 고객 지향적 행정은 관료 중심이 아닌 시민 중심의 서비스 제공을 뜻한다.', e: '시민을 왕(고객)처럼 대우해야 한다는 원칙입니다.' },
  { c: 4, d: 3, a: 'O', q: '거버넌스 체제에서는 참여자 간의 명령과 복종보다는 신뢰(Trust)를 기반으로 한 조정이 더 중요하다.', e: '수평적 네트워크의 유지 기반은 상호 신뢰입니다.' },
  { c: 4, d: 2, a: 'X', q: '공공선택론은 인간을 이타적 존재로 가정하여 경제학의 시각을 완전히 배제했다.', e: '경제학의 합리적이고 이기적인 경제인 가정을 그대로 행정학에 도입했습니다.' },
  { c: 4, d: 2, a: 'O', q: '뉴딜 시기에는 의회가 복잡한 사회 문제에 대응할 법을 제때 못 만들어 행정부의 역할이 커졌다.', e: '행정 국가화 현상의 주요 원인입니다.' },
  { c: 4, d: 2, a: 'O', q: '신행정학 학자들은 관료들이 소외계층을 대변하기 위해 적극적인 역할을 해야 한다고 주장했다.', e: '사회적 형평성을 위한 주도적 행정을 요구했습니다.' },
  { c: 4, d: 2, a: 'O', q: '행태주의 연구는 컴퓨터의 발달과 함께 대량의 데이터를 통계적으로 분석하는 데 기여했다.', e: '실증적 데이터를 중시했기 때문입니다.' },
  { c: 4, d: 2, a: 'O', q: 'NPM의 기업가적 정부는 지출 통제에만 머물지 않고 수익을 창출하는 방안도 고민한다.', e: '혁신적인 마인드를 요구합니다.' },
  { c: 4, d: 2, a: 'O', q: '1970년대 오일쇼크는 큰 정부의 재정 악화를 초래하여 NPM 등 개혁의 계기가 되었다.', e: '경제 위기가 정부 축소론을 불렀습니다.' },
  { c: 4, d: 1, a: 'O', q: '공동생산(Coproduction)은 시민이 서비스 제공 과정에 동참하는 주체가 되는 것을 뜻한다.', e: '행정의 객체에서 주체로의 변화입니다.' },

  // 제5장 (96~120)
  { c: 5, d: 1, a: 'O', q: '베버가 제시한 근대적 관료제는 합법적이고 합리적인 권위에 기초하여 운영된다.', e: '전통이나 카리스마가 아닌 법규에 의한 통치가 핵심입니다.' },
  { c: 5, d: 1, a: 'O', q: '관료제 조직은 업무의 효율성을 높이기 위해 고도의 전문화(분업) 원리를 적용한다.', e: '업무를 세분화하여 전문성을 극대화합니다.' },
  { c: 5, d: 1, a: 'O', q: '관료제 조직의 구조는 평등한 형태가 아니라 명령과 복종의 계층제(Hierarchy) 형태를 띤다.', e: '엄격한 상하 지휘 체계를 갖습니다.' },
  { c: 5, d: 2, a: 'X', q: '관료제는 업무 처리 시 개인적 감정이나 친분을 적극 반영하여 유연하게 결정하는 것을 원칙으로 한다.', e: '사적 감정을 배제하는 비정의성(Impersonality)이 원칙입니다.' },
  { c: 5, d: 2, a: 'O', q: '관료제의 모든 업무 처리는 책임 소재를 명확히 하기 위해 문서(문서주의)를 통해 이루어지는 것이 원칙이다.', e: '공식적이고 영구적인 기록을 중시합니다.' },
  { c: 5, d: 3, a: 'X', q: '관료제는 환경이 급변하고 불확실성이 높은 현대 정보화 사회에 가장 완벽하게 적응하는 조직이다.', e: '계층제와 규칙 중심의 경직성 때문에 급변하는 환경 대처에 취약합니다.' },
  { c: 5, d: 2, a: 'O', q: '번문욕례(Red Tape)는 목표 달성보다 문서 양식이나 복잡한 절차에 지나치게 집착하는 관료제의 역기능이다.', e: '대표적인 관료주의의 폐해입니다.' },
  { c: 5, d: 2, a: 'O', q: '목표의 전환 현상은 수단인 규칙 준수가 조직의 본래 목표보다 더 중요해지는 병리 현상이다.', e: '규칙 집착으로 시민 서비스라는 본질을 잃는 현상입니다.' },
  { c: 5, d: 3, a: 'O', q: '훈련된 무능은 관료가 자기 분야의 일만 하다 좁은 시야를 갖게 되어 다른 분야를 이해하지 못하는 현상이다.', e: '타 부서와의 소통을 저해하는 요인이 됩니다.' },
  { c: 5, d: 3, a: 'X', q: '베버는 관료제가 정부와 같은 공공 부문에서만 나타나는 특수한 현상이라고 보았다.', e: '기업, 군대 등 모든 거대 조직에서 나타나는 보편적 현상으로 보았습니다.' },
  { c: 5, d: 2, a: 'X', q: '관료제 조직은 개인의 능력이나 자격증이 아니라 소유한 신분이나 핏줄에 의해 직위가 결정된다.', e: '근대 관료제는 실적과 기술적 능력을 기준으로 채용합니다.' },
  { c: 5, d: 1, a: 'X', q: '립스키의 일선 관료는 국가의 주요 정책을 결정하는 고위직 엘리트 공무원을 지칭한다.', e: '경찰, 사회복지사 등 현장에서 시민과 대면하는 최일선 공무원입니다.' },
  { c: 5, d: 2, a: 'O', q: '일선 관료는 업무 지침이 모호하거나 상황이 복잡할 때 현장에서 상당한 재량권을 행사한다.', e: '립스키 이론의 핵심 개념입니다.' },
  { c: 5, d: 3, a: 'X', q: '일선 관료는 항상 인력과 자원이 완벽하게 갖춰진 환경 속에서 여유롭게 업무를 수행한다.', e: '만성적인 자원 부족과 시간 압박에 시달립니다.' },
  { c: 5, d: 3, a: 'O', q: '일선 관료의 재량권 행사로 인해, 동일한 정책도 담당 공무원에 따라 시민에게 다르게 집행될 수 있다.', e: '담당자가 누구냐가 실질적인 정책 내용을 결정합니다.' },
  { c: 5, d: 2, a: 'O', q: '자원이 부족한 일선 관료는 살아남기 위해 고정관념에 의존해 시민을 기계적으로 응대하려는 경향을 보인다.', e: '업무를 단순화하려는 대응 기제입니다.' },
  { c: 5, d: 2, a: 'O', q: '표준운영절차(SOP)는 반복 업무를 효율적으로 처리하게 하지만, 새로운 위기 상황에서는 적응력을 떨어뜨린다.', e: 'SOP의 양면성입니다.' },
  { c: 5, d: 2, a: 'O', q: '관료의 권력형 성향은 상급자에게 맹종하고 하급자나 시민에게 권위적으로 군림하려는 태도이다.', e: '계층제의 병리 현상 중 하나입니다.' },
  { c: 5, d: 3, a: 'X', q: '관료제는 담당자가 바뀌면 업무 노하우가 완전히 사라져 조직의 기억(Institutional Memory) 유지에 불리하다.', e: '문서주의 덕분에 담당자가 바뀌어도 기억이 잘 유지되는 장점이 있습니다.' },
  { c: 5, d: 3, a: 'O', q: '관료제 모델에서는 상급자의 명령이라도 법규에 어긋난다면 복종하지 않는 것이 원칙이다.', e: '충성의 대상은 사람이 아니라 법과 합법적 권위입니다.' },
  { c: 5, d: 2, a: 'O', q: '일선 관료는 시민과 직접 만나기 때문에 고위 결정자보다 현장의 실제 상황을 더 잘 파악할 수 있다.', e: '일선 관료에게 재량권이 필요한 이유입니다.' },
  { c: 5, d: 2, a: 'O', q: '관료제의 과도한 분업은 부서 이기주의(할거주의)를 심화시켜 조직 전체의 목표 달성을 방해할 수 있다.', e: '내 부서의 이익만 챙기는 부작용입니다.' },
  { c: 5, d: 3, a: 'X', q: '현대 사회에서는 관료제의 폐해 때문에 전 세계 대규모 조직에서 관료제 형태가 완전히 사라졌다.', e: '여전히 거대 조직을 운영하는 가장 보편적이고 기본적인 골격입니다.' },
  { c: 5, d: 2, a: 'O', q: '관료제 내의 전문가는 문제 해결 시 자신들의 훈련된 방식만 고집하는 인지적 저항을 보이기도 한다.', e: '훈련된 무능의 연장선입니다.' },
  { c: 5, d: 3, a: 'X', q: '일선 관료가 우선순위를 임의로 정하거나 일부 업무를 포기하는 행위는 현실에서 절대 일어나지 않는다.', e: '열악한 환경에서 흔히 나타나는 대응 전략입니다.' },

  // 제6장 (121~135)
  { c: 6, d: 1, a: 'O', q: '현재 대한민국은 광역자치단체와 기초자치단체를 두는 중층제 지방자치 체계를 기본으로 운영한다.', e: '특별시/도(광역)와 시/군/구(기초)의 2단계 구조입니다.' },
  { c: 6, d: 2, a: 'O', q: '자치조직권은 지방자치단체가 자신의 기구와 조직을 법령 범위 내에서 스스로 정할 수 있는 권리이다.', e: '지역 실정에 맞는 조직 구성 권한입니다.' },
  { c: 6, d: 2, a: 'X', q: '대한민국의 모든 지방자치단체는 예외 없이 기초자치단체를 반드시 하부에 두어야 한다.', e: '세종시와 제주도는 하위 지자체가 없는 단층제로 운영됩니다.' },
  { c: 6, d: 1, a: 'O', q: '중앙행정기관 중 부(Ministry)는 특정 분야의 정책 수립과 집행을 총괄하며 장관이 국무위원 지위를 가진다.', e: '가장 핵심적인 중앙 행정 기관입니다.' },
  { c: 6, d: 2, a: 'O', q: '중앙행정기관 중 청(Agency)은 주로 정책 기획보다는 구체적인 업무의 집행을 전문적으로 담당한다.', e: '국세청, 경찰청처럼 집행 중심의 독자적 기관입니다.' },
  { c: 6, d: 2, a: 'O', q: '중앙행정기관 중 처(Office)는 여러 부처의 업무를 조율하거나 국무총리를 지원하는 참모적 기관이다.', e: '법제처처럼 기능적이고 조정 역할을 하는 조직입니다.' },
  { c: 6, d: 2, a: 'O', q: '행정안전부는 대한민국의 지방자치단체 조직과 정원 기준을 총괄 관리하는 주무 부처이다.', e: '지방행정을 관리하는 핵심 부처입니다.' },
  { c: 6, d: 2, a: 'O', q: '합의제 행정기관(위원회)은 한 명의 기관장이 아닌 여러 위원들의 합의를 통해 의사를 결정하는 조직이다.', e: '방송통신위원회처럼 신중성이 요구되는 곳에 설치됩니다.' },
  { c: 6, d: 3, a: 'X', q: '우리나라 지자체의 재정 자립도는 자체 지방세만으로 예산의 100%를 충당할 만큼 매우 높다.', e: '평균 50% 미만으로 중앙정부 의존도가 높습니다.' },
  { c: 6, d: 3, a: 'X', q: '우리나라는 중앙의 권한이 지방에 완전히 이양된 완벽한 연방제 국가이다.', e: '우리나라는 중앙집권적 성격이 있는 단일국가 체제입니다.' },
  { c: 6, d: 2, a: 'O', q: '특별시와 광역시에 속해 있는 자치구는 시장이 임명하지 않고 주민들이 구청장을 직접 선출한다.', e: '서울시 강남구 등은 독립된 기초자치단체입니다.' },
  { c: 6, d: 2, a: 'O', q: '부속기관은 중앙행정기관에 소속되어 교육훈련, 시험연구 등의 행정 지원 업무를 담당하는 기관이다.', e: '인재개발원, 국립과학수사연구원 등이 속합니다.' },
  { c: 6, d: 3, a: 'X', q: '특별지방행정기관은 지방자치단체 소속으로서 해당 지역의 고유한 자치 사무만을 처리한다.', e: '경찰청, 세무서 등은 중앙정부 소속으로 지역에 파견된 기관입니다.' },
  { c: 6, d: 2, a: 'O', q: '조직의 편재성이란 우리가 태어날 때부터 죽을 때까지 거의 모든 활동이 조직 내에서 이루어짐을 의미한다.', e: '현대 조직사회의 특징을 나타냅니다.' },
  { c: 6, d: 1, a: 'O', q: '지방자치권에는 조례와 규칙을 스스로 제정할 수 있는 자치입법권이 포함된다.', e: '스스로 법규를 만들 수 있는 권한입니다.' },

  // 제7장 (136~150)
  { c: 7, d: 2, a: 'O', q: '동기부여의 내용 이론은 사람 내면에 있는 무엇(What)이 동기를 유발하는지 욕구의 종류에 초점을 맞춘다.', e: '매슬로, 허즈버그 등의 이론이 여기에 속합니다.' },
  { c: 7, d: 2, a: 'O', q: '동기부여의 과정 이론은 사람이 어떠한 심리적 과정(How)을 거쳐 행동을 결정하는지를 설명한다.', e: '브룸의 기대이론이 대표적입니다.' },
  { c: 7, d: 1, a: 'O', q: '매슬로의 욕구단계설은 하위 단계가 충족되어야만 다음 상위 단계의 욕구가 동기로서 작용한다고 본다.', e: '생리, 안전, 사회, 존경, 자아실현 순으로 올라갑니다.' },
  { c: 7, d: 2, a: 'X', q: '매슬로 이론에서 가장 최고위 단계에 위치하며, 잠재력을 발휘하려는 욕구를 존경 욕구라고 한다.', e: '최고위 단계는 존경이 아닌 자아실현 욕구입니다.' },
  { c: 7, d: 2, a: 'O', q: '매슬로에 의하면, 이미 충분히 만족된 욕구는 더 이상 사람을 움직이는 동기 유발 요인이 되지 못한다.', e: '충족된 욕구는 동기 유발 기능을 상실합니다.' },
  { c: 7, d: 1, a: 'O', q: '맥그리거의 X이론은 인간이 본질적으로 일을 싫어하고 책임을 회피하려는 수동적 존재라고 가정한다.', e: '성악설에 가까운 전통적 통제 방식의 전제입니다.' },
  { c: 7, d: 2, a: 'X', q: '맥그리거의 Y이론을 믿는 관리자는 직원들에게 엄격한 처벌과 금전적 통제를 가하는 방식을 택할 것이다.', e: '처벌과 통제는 X이론적 방식입니다. Y이론은 자율성을 부여합니다.' },
  { c: 7, d: 2, a: 'O', q: '허즈버그의 동기-위생 이론은 불만을 없애는 요인과 만족을 주는 요인이 서로 완전히 별개의 차원이라고 보았다.', e: '불만의 반대가 만족이 아니라는 독특한 이원적 시각입니다.' },
  { c: 7, d: 3, a: 'X', q: '허즈버그 이론에서 작업 조건이나 급여는 작업자를 만족스럽게 만들어 열정을 높이는 동기 요인이다.', e: '급여와 환경은 불만을 줄여줄 뿐인 위생 요인입니다.' },
  { c: 7, d: 2, a: 'O', q: '허즈버그 이론에서 일 자체의 성취감, 인정, 책임감 등은 직무 만족을 직접 높이는 동기 요인이다.', e: '일 자체의 매력이 진짜 동기부여의 원천이라고 보았습니다.' },
  { c: 7, d: 3, a: 'O', q: '직원 월급을 올렸는데도 성과가 오르지 않는다면, 허즈버그 관점에서는 위생 요인만 충족되었기 때문이다.', e: '불만은 없어졌지만, 열정을 이끌어낼 동기 요인이 없기 때문입니다.' },
  { c: 7, d: 2, a: 'O', q: '브룸의 기대이론에서 기대감(Expectancy)은 내가 노력하면 목표한 성과를 낼 수 있을 것이라는 주관적 믿음이다.', e: '노력과 성과 사이의 연결 고리입니다.' },
  { c: 7, d: 2, a: 'O', q: '브룸의 이론에서 유의성(Valence)은 개인이 특정 보상에 대해 부여하는 주관적인 가치나 매력도를 뜻한다.', e: '나에게 그 보상이 얼마나 가치 있는가를 의미합니다.' },
  { c: 7, d: 2, a: 'O', q: '브룸의 이론에서 수단성(Instrumentality)은 높은 성과를 내면 반드시 약속된 보상이 주어질 것이라는 믿음이다.', e: '성과와 보상 사이의 연결 고리입니다.' },
  { c: 7, d: 3, a: 'O', q: '브룸의 이론에 따르면 기대감, 수단성, 유의성 중 하나라도 0이면 전체 동기는 0이 되어 행동하지 않는다.', e: '세 요소의 곱(E×I×V)으로 동기가 결정되기 때문입니다.' }
];

export default function MidtermQuiz150App() {
  const [gameState, setGameState] = useState('setup');
  
  const [selectedChapter, setSelectedChapter] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedCount, setSelectedCount] = useState('30');
  
  const [quizList, setQuizList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  
  const [userAnswer, setUserAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  // 추가된 상태: 팝업 모달 제어 및 에러 메시지
  const [showQuitModal, setShowQuitModal] = useState(false);
  const [setupError, setSetupError] = useState('');

  const shuffle = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const handleStart = (isRandom30 = false) => {
    let filtered = questionData;

    if (!isRandom30) {
      if (selectedChapter !== 'all') {
        filtered = filtered.filter(q => q.c.toString() === selectedChapter);
      }
      if (selectedDifficulty !== 'all') {
        filtered = filtered.filter(q => q.d.toString() === selectedDifficulty);
      }
    }

    filtered = shuffle(filtered);
    
    const countLimit = isRandom30 ? 30 : (selectedCount === 'all' ? filtered.length : parseInt(selectedCount, 10));
    const finalQuestions = filtered.slice(0, Math.min(countLimit, filtered.length));

    if (finalQuestions.length === 0) {
      setSetupError("선택한 조건에 맞는 문제가 없습니다. 조건을 변경해주세요.");
      return;
    }

    setSetupError(''); // 에러 초기화
    setQuizList(finalQuestions);
    setCurrentIndex(0);
    setScore(0);
    setWrongAnswers([]);
    setUserAnswer(null);
    setIsCorrect(null);
    setStartTime(new Date());
    setGameState('playing');
  };

  const handleAnswer = (answer) => {
    if (userAnswer !== null) return;
    const currentQ = quizList[currentIndex];
    const correct = answer === currentQ.a;
    setUserAnswer(answer);
    setIsCorrect(correct);
    if (correct) {
      setScore(prev => prev + 1);
    } else {
      setWrongAnswers(prev => [...prev, { ...currentQ, userAnswer: answer }]);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < quizList.length) {
      setCurrentIndex(prev => prev + 1);
      setUserAnswer(null);
      setIsCorrect(null);
    } else {
      setEndTime(new Date());
      setGameState('result');
    }
  };

  const handleQuitClick = () => {
    setShowQuitModal(true); // 중단 팝업 띄우기
  };

  const confirmQuit = (shouldQuit) => {
    if (!shouldQuit) {
      setShowQuitModal(false);
      return;
    }

    let answeredCount = currentIndex;
    // 현재 문제의 O/X를 누른 상태에서 중단하는 경우도 포함
    if (userAnswer !== null) {
      answeredCount = currentIndex + 1;
    }

    setShowQuitModal(false);

    // 한 문제도 안 풀고 나가는 경우 초기화면으로
    if (answeredCount === 0) {
      setGameState('setup');
      return;
    }

    // 지금까지 푼 문제까지만 리스트를 자르고 결과 화면으로 이동
    setQuizList(prev => prev.slice(0, answeredCount));
    setEndTime(new Date());
    setGameState('result');
  };

  const getDurationString = (start, end) => {
    if (!start || !end) return "";
    const diffSeconds = Math.floor((end - start) / 1000);
    const m = Math.floor(diffSeconds / 60);
    const s = diffSeconds % 60;
    return `${m > 0 ? `${m}분 ` : ''}${s}초`;
  };

  const getFormatDateKorean = (date) => {
    if (!date) return "";
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${days[date.getDay()]}요일 ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  if (gameState === 'setup') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans text-slate-800">
        <div className="bg-white max-w-2xl w-full rounded-2xl shadow-xl overflow-hidden border border-slate-200">
          <div className="bg-blue-700 p-8 text-center text-white">
            <BookOpen className="w-14 h-14 mx-auto mb-4 opacity-90" />
            <h1 className="text-3xl font-extrabold mb-2 tracking-tight">행정학개론 150제 마스터</h1>
            <p className="text-blue-100 text-lg font-medium">전 범위 핵심 문항 탑재 완료</p>
          </div>

          <div className="p-8 space-y-6">
            <div className="space-y-5">
              
              {/* 에러 메시지 표시 영역 */}
              {setupError && (
                <div className="p-4 bg-red-50 text-red-600 rounded-xl font-bold border border-red-200 text-sm flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  {setupError}
                </div>
              )}

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">단원 집중 공략 (선택)</label>
                <select 
                  className="w-full p-3.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-700 font-medium"
                  value={selectedChapter}
                  onChange={(e) => setSelectedChapter(e.target.value)}
                >
                  <option value="all">전체 단원 (종합 모의고사)</option>
                  {Object.entries(chapters).map(([key, val]) => (
                    <option key={key} value={key}>{val}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">난이도 필터</label>
                  <select 
                    className="w-full p-3.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                  >
                    <option value="all">전체 난이도</option>
                    <option value="3">상 (고득점 대비)</option>
                    <option value="2">중 (핵심 원리)</option>
                    <option value="1">하 (기초 개념)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">문항 수</label>
                  <select 
                    className="w-full p-3.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                    value={selectedCount}
                    onChange={(e) => setSelectedCount(e.target.value)}
                  >
                    <option value="10">10문제 (가볍게)</option>
                    <option value="30">30문제 (실전형)</option>
                    <option value="50">50문제 (중간고사 길이)</option>
                    <option value="all">150문제 (끝장 보기)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-4 flex flex-col sm:flex-row gap-3 border-t border-slate-100">
              <button 
                onClick={() => handleStart(true)}
                className="flex-1 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors"
              >
                선택 안 함<br/><span className="text-xs font-medium text-slate-500">랜덤 30제 실전 시작</span>
              </button>
              <button 
                onClick={() => handleStart(false)}
                className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all"
              >
                설정 적용<br/><span className="text-xs font-medium text-blue-200">맞춤형 퀴즈 시작</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'playing') {
    const currentQ = quizList[currentIndex];
    
    return (
      <div className="min-h-screen bg-slate-50 p-4 md:p-6 font-sans text-slate-800">
        <div className="max-w-3xl mx-auto">
          {/* 상단 네비게이션 */}
          <div className="flex justify-between items-center mb-6">
            <button 
              onClick={handleQuitClick}
              className="flex items-center text-slate-500 hover:text-slate-800 transition-colors bg-white px-4 py-2.5 rounded-xl shadow-sm border border-slate-200 font-bold text-sm"
            >
              <Home className="w-4 h-4 mr-2" /> 중단 및 결과보기
            </button>
            <div className="bg-blue-100 text-blue-800 px-4 py-2.5 rounded-xl font-bold shadow-sm">
              진행률 {currentIndex + 1} / {quizList.length}
            </div>
          </div>

          {/* 문제 카드 */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="bg-slate-100 border-b border-slate-200 p-4 px-6 flex justify-between items-center text-sm font-bold text-slate-600">
              <span className="truncate pr-4">{chapters[currentQ.c]}</span>
              <span className="bg-white px-3 py-1 rounded-md shadow-sm whitespace-nowrap">난이도 {diffs[currentQ.d]}</span>
            </div>
            
            <div className="p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-extrabold leading-relaxed mb-12">
                <span className="text-blue-600 mr-2 text-3xl">Q.</span> 
                {currentQ.q}
              </h2>

              {/* OX 버튼 */}
              <div className="grid grid-cols-2 gap-4 md:gap-8">
                <button
                  onClick={() => handleAnswer('O')}
                  disabled={userAnswer !== null}
                  className={`py-14 rounded-2xl text-6xl md:text-7xl font-black transition-all duration-200 shadow-sm border-4 
                    ${userAnswer === 'O' 
                        ? (isCorrect ? 'bg-blue-600 text-white border-blue-600 shadow-xl scale-105' : 'bg-red-500 text-white border-red-500') 
                        : (userAnswer !== null ? 'bg-slate-50 text-slate-200 border-slate-100' : 'bg-white text-blue-500 border-blue-100 hover:border-blue-500 hover:bg-blue-50')}`}
                >
                  O
                </button>
                <button
                  onClick={() => handleAnswer('X')}
                  disabled={userAnswer !== null}
                  className={`py-14 rounded-2xl text-6xl md:text-7xl font-black transition-all duration-200 shadow-sm border-4 
                    ${userAnswer === 'X' 
                        ? (isCorrect ? 'bg-blue-600 text-white border-blue-600 shadow-xl scale-105' : 'bg-red-500 text-white border-red-500') 
                        : (userAnswer !== null ? 'bg-slate-50 text-slate-200 border-slate-100' : 'bg-white text-blue-500 border-blue-100 hover:border-blue-500 hover:bg-blue-50')}`}
                >
                  X
                </button>
              </div>

              {/* 해설 영역 */}
              {userAnswer && (
                <div className={`mt-10 p-6 md:p-8 rounded-2xl border-2 ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} transition-all`}>
                  <div className="flex items-center mb-4">
                    {isCorrect 
                      ? <CheckCircle2 className="w-8 h-8 text-green-600 mr-3" /> 
                      : <XCircle className="w-8 h-8 text-red-600 mr-3" />
                    }
                    <h3 className={`text-xl font-black ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                      {isCorrect ? '정답입니다!' : `오답! 정답은 [ ${currentQ.a} ]`}
                    </h3>
                  </div>
                  <p className="text-slate-800 text-lg leading-relaxed font-medium">
                    <span className="text-blue-700 font-bold mr-2 border-b-2 border-blue-200">교수님 해설</span><br className="md:hidden" /> {currentQ.e}
                  </p>
                </div>
              )}
            </div>
            
            {/* 다음 버튼 */}
            {userAnswer && (
              <div className="p-6 bg-slate-50 border-t border-slate-200">
                <button 
                  onClick={handleNext}
                  className="w-full py-5 bg-slate-800 hover:bg-black text-white text-lg font-bold rounded-xl flex justify-center items-center shadow-lg transition-colors"
                >
                  {currentIndex + 1 === quizList.length ? '최종 결과 확인하기' : '다음 문제 진행'} <ChevronRight className="w-6 h-6 ml-1" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 커스텀 중단 확인 팝업 (모달) */}
        {showQuitModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm transition-all">
            <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl">
              <h3 className="text-2xl font-extrabold text-slate-800 mb-3">퀴즈 중단</h3>
              <p className="text-slate-600 mb-8 font-medium leading-relaxed">
                퀴즈를 중단하시겠습니까?<br/>
                지금까지 완료한 <strong className="text-blue-600">{userAnswer !== null ? currentIndex + 1 : currentIndex}문제</strong>를 기준으로 성적과 오답이 분석됩니다.
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={() => confirmQuit(false)} 
                  className="flex-1 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors"
                >
                  계속 풀기
                </button>
                <button 
                  onClick={() => confirmQuit(true)} 
                  className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition-colors"
                >
                  결과 보기
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (gameState === 'result') {
    const totalQ = quizList.length;
    const finalScore = Math.round((score / totalQ) * 100);
    const timeTaken = getDurationString(startTime, endTime);
    
    return (
      <div className="min-h-screen bg-slate-100 p-4 md:p-8 font-sans text-slate-800">
        <div className="max-w-4xl mx-auto space-y-6">
          
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
            <div className="bg-blue-700 p-10 text-center text-white">
              <Award className="w-24 h-24 mx-auto mb-4 text-yellow-300 drop-shadow-md" />
              <h1 className="text-3xl font-extrabold mb-2">테스트 분석 완료</h1>
              <p className="text-blue-100 font-medium">수고하셨습니다. 성적과 오답을 확인하세요.</p>
            </div>
            
            <div className="p-8 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-50 rounded-2xl p-6 text-center border border-slate-200 shadow-sm">
                <div className="text-slate-500 font-bold mb-3 text-sm tracking-wide">나의 환산 점수</div>
                <div className="text-6xl font-black text-blue-600">{finalScore}<span className="text-2xl font-bold ml-1 text-slate-400">점</span></div>
              </div>
              <div className="bg-slate-50 rounded-2xl p-6 text-center border border-slate-200 shadow-sm flex flex-col justify-center">
                <div className="text-slate-500 font-bold mb-3 text-sm tracking-wide">정답 / 오답 (총 {totalQ}제)</div>
                <div className="text-3xl font-black mt-1">
                  <span className="text-green-600 bg-green-100 px-3 py-1 rounded-lg">{score}</span>
                  <span className="text-slate-300 mx-2">/</span>
                  <span className="text-red-500 bg-red-100 px-3 py-1 rounded-lg">{wrongAnswers.length}</span>
                </div>
              </div>
              <div className="bg-slate-50 rounded-2xl p-6 text-center border border-slate-200 shadow-sm flex flex-col justify-center">
                <div className="text-slate-500 font-bold mb-3 text-sm tracking-wide flex justify-center items-center">
                  <Clock className="w-4 h-4 mr-1.5" /> 소요 시간
                </div>
                <div className="text-3xl font-black text-slate-700 mb-2">{timeTaken}</div>
                <div className="text-xs font-bold text-slate-400 flex items-center justify-center bg-white py-1.5 rounded-md border border-slate-200">
                  <Calendar className="w-3 h-3 mr-1" /> {getFormatDateKorean(endTime)}
                </div>
              </div>
            </div>
            
            <div className="px-8 md:px-10 pb-10">
               <button 
                  onClick={() => setGameState('setup')}
                  className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl flex justify-center items-center shadow-lg shadow-blue-200 transition-all text-lg"
                >
                  <RotateCcw className="w-5 h-5 mr-2" /> 새 퀴즈 세팅하러 가기
                </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 md:p-10">
            <h2 className="text-2xl font-black text-slate-800 mb-8 flex items-center">
              <AlertCircle className="w-7 h-7 text-red-500 mr-3" /> 취약점 분석 (오답 노트)
            </h2>
            
            {wrongAnswers.length === 0 ? (
              <div className="text-center py-16 bg-green-50 rounded-2xl border border-green-100">
                <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-black text-green-800">퍼펙트! 틀린 문제가 없습니다.</h3>
                <p className="text-green-600 font-medium mt-2">이대로만 하시면 무조건 A+ 입니다!</p>
              </div>
            ) : (
              <div className="space-y-6">
                {wrongAnswers.map((item, idx) => (
                  <div key={idx} className="bg-slate-50 rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm">
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <span className="bg-red-500 text-white text-xs font-black px-3 py-1 rounded-md shadow-sm">오답 {idx + 1}</span>
                      <span className="text-xs font-bold text-slate-600 bg-white px-3 py-1 rounded-md border border-slate-200 shadow-sm">{chapters[item.c]}</span>
                    </div>
                    <p className="font-extrabold text-slate-800 text-lg md:text-xl leading-relaxed mb-6">Q. {item.q}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6 text-sm md:text-base font-black">
                      <div className="bg-white border-2 border-red-200 text-red-600 p-4 rounded-xl text-center">
                        내 선택: {item.userAnswer}
                      </div>
                      <div className="bg-white border-2 border-green-300 text-green-700 p-4 rounded-xl text-center">
                        진짜 정답: {item.a}
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
                      <p className="text-blue-900 font-medium leading-relaxed">
                        <span className="font-black text-blue-700 mr-2 bg-white px-2 py-0.5 rounded text-sm shadow-sm">해설</span>
                        {item.e}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
        </div>
      </div>
    );
  }

  return null;
}
