import {
    defineConfig,
    presetWind,
    presetAttributify,
    presetWebFonts,
} from 'unocss';
import transformerVariantGroup from '@unocss/transformer-variant-group';

export default defineConfig({
    presets: [
        presetWind(),
        presetAttributify(),
        presetWebFonts({
            provider: 'none',
            fonts: {
                inter: [
                    { name: 'Inter', weights: [400, 600, 700] },
                    { name: 'sans-serif' },
                ],
            },
        }),
    ],
    transformers: [transformerVariantGroup()],
});
