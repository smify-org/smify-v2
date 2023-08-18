import { useEffect, useRef } from "react";

export default function SelectUserIconModal({
    isOpen,
    setIconSelected = () => '',
}: {
    isOpen: boolean,
    setIconSelected?: (icon: string) => void,
}) {

    const icons = [
        'bruxo',
        'cavaleiro',
        'ceifador',
        'fantasma',
        'mago',
        'ninja',
        'super-heroi',
    ];

    useEffect(() => {
        if (ref.current) {
            setTimeout(() => {
                if (isOpen) {
                    ref.current?.classList.add('show');
                } else {
                    ref.current?.classList.remove('show');
                }
            }, 100);
        }
    }, [isOpen]);


    const ref = useRef<HTMLDivElement>(null);
    return (
        <>
            <div className='modal-backdrop fade show'></div>
            <div className="modal-open">
                <div
                    ref={ref}
                    className="modal fade" role="dialog"
                    style={{
                        display: isOpen ? 'block' : 'none',
                    }}
                >
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                                <h1>Selecione um ícone</h1>
                          </div>

                            <div className="modal-body">
                                <div className="icons-container grid row">
                                    {
                                        icons.map((icon, index) => (
                                            <div 
                                            key={index}
                                             className="icons-container__icons col-sm-3 col-md-3"
                                             onClick={() => setIconSelected(icon)}
                                             >
                                                <img src={`./users-icons/${icon}.png`} alt="" />
                                            </div>
                                        ))
                                    }
                                </div>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}