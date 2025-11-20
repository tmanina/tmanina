"use client"

export function About() {
    return (
        <div className="container py-4">
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
                {/* Header */}
                <div className="home-hero-gradient p-4 p-md-5 text-white">
                    <h1 className="h2 fw-bold mb-3">
                        <i className="fas fa-info-circle ms-2"></i>
                        عن التطبيق
                    </h1>
                    <p className="mb-0 opacity-90">
                        تطبيق طمانينة - رفيقك في رحلة التقرب إلى الله
                    </p>
                </div>

                {/* Content */}
                <div className="card-body p-4 p-md-5">
                    <div className="row g-4">
                        {/* من نحن */}
                        <div className="col-12">
                            <div className="mb-4">
                                <h3 className="h4 fw-bold mb-3" style={{ color: "var(--primary-gold)" }}>
                                    <i className="fas fa-heart ms-2"></i>
                                    من نحن
                                </h3>
                                <p className="text-muted fs-5 lh-lg">
                                    طمانينة هو تطبيق إسلامي شامل يهدف إلى مساعدتك في المحافظة على أذكارك اليومية
                                    والتقرب إلى الله عز وجل. نسعى لتوفير تجربة سهلة وجميلة تجمع بين الأذكار،
                                    مواقيت الصلاة، والتقويم الإسلامي في مكان واحد.
                                </p>
                            </div>
                        </div>

                        {/* رؤيتنا */}
                        <div className="col-12 col-md-6">
                            <div className="p-4 rounded-4 bg-body-secondary h-100">
                                <div className="text-center mb-3">
                                    <i className="fas fa-eye fs-1 gradient-text"></i>
                                </div>
                                <h4 className="h5 fw-bold text-center mb-3">رؤيتنا</h4>
                                <p className="text-muted text-center mb-0">
                                    أن نكون المرجع الأول للمسلمين في متابعة عباداتهم اليومية
                                    وتسهيل طريقهم نحو الطاعة والذكر.
                                </p>
                            </div>
                        </div>

                        {/* مهمتنا */}
                        <div className="col-12 col-md-6">
                            <div className="p-4 rounded-4 bg-body-secondary h-100">
                                <div className="text-center mb-3">
                                    <i className="fas fa-bullseye fs-1 gradient-text"></i>
                                </div>
                                <h4 className="h5 fw-bold text-center mb-3">مهمتنا</h4>
                                <p className="text-muted text-center mb-0">
                                    تقديم أدوات عملية وسهلة الاستخدام تساعد المسلم على الالتزام
                                    بأذكاره وعباداته في كل وقت ومكان.
                                </p>
                            </div>
                        </div>

                        {/* مميزات التطبيق */}
                        <div className="col-12">
                            <h3 className="h4 fw-bold mb-4 mt-3" style={{ color: "var(--primary-gold)" }}>
                                <i className="fas fa-star ms-2"></i>
                                مميزات التطبيق
                            </h3>
                            <div className="row g-3">
                                <div className="col-12 col-md-6">
                                    <div className="d-flex align-items-start">
                                        <i className="fas fa-check-circle fs-4 ms-3 mt-1" style={{ color: "var(--sage-green)" }}></i>
                                        <div>
                                            <h5 className="h6 fw-bold mb-1">أذكار الصباح والمساء</h5>
                                            <p className="text-muted small mb-0">أذكار مصنفة ومنظمة مع عداد تلقائي</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="d-flex align-items-start">
                                        <i className="fas fa-check-circle fs-4 ms-3 mt-1" style={{ color: "var(--sage-green)" }}></i>
                                        <div>
                                            <h5 className="h6 fw-bold mb-1">مواقيت الصلاة</h5>
                                            <p className="text-muted small mb-0">مواعيد دقيقة حسب موقعك</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="d-flex align-items-start">
                                        <i className="fas fa-check-circle fs-4 ms-3 mt-1" style={{ color: "var(--sage-green)" }}></i>
                                        <div>
                                            <h5 className="h6 fw-bold mb-1">التقويم الإسلامي</h5>
                                            <p className="text-muted small mb-0">عرض متزامن للهجري والميلادي</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="d-flex align-items-start">
                                        <i className="fas fa-check-circle fs-4 ms-3 mt-1" style={{ color: "var(--sage-green)" }}></i>
                                        <div>
                                            <h5 className="h6 fw-bold mb-1">عداد التسبيح</h5>
                                            <p className="text-muted small mb-0">سبحة رقمية لتسهيل الذكر</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* تواصل معنا */}
                        <div className="col-12">
                            <div className="text-center p-4 p-md-5 rounded-4" style={{ background: "var(--primary-gradient)" }}>
                                <i className="fas fa-hands-praying fs-1 text-white mb-3"></i>
                                <h4 className="h5 fw-bold text-white mb-2">دعواتكم</h4>
                                <p className="text-white mb-0 opacity-90">
                                    نسأل الله أن يتقبل منا ومنكم صالح الأعمال، وأن يجعل هذا العمل في ميزان حسناتنا
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
