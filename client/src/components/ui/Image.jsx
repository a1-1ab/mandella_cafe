import { useState } from 'react';
import cn from '../../lib/cn.js';

const Image = ({ src, alt, className, wrapperClassName }) => {
  const [failed, setFailed] = useState(false);

  return (
    <div className={cn('relative overflow-hidden bg-sand', wrapperClassName)}>
      {failed ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-teal-soft via-sand to-gold/40">
          <span className="text-[11px] font-semibold text-teal-deep/70">مانديلا</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className={cn('h-full w-full object-cover', className)}
        />
      )}
    </div>
  );
};

export default Image;
