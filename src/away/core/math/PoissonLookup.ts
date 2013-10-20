///<reference path="../../_definitions.ts"/>

module away.math
{
    export class PoissonLookup
    {
        public static _distributions:Array<Array<number>>;

        public static initDistributions():void
        {
            // precalculated for best control
            this._distributions = new Array<Array<number>>();
            this._distributions[0] = new Array<number>(0.3082841, 0.4320919);
            this._distributions[1] = new Array<number>(0.3082841, 0.4320919, -0.2274942, -0.6640266);
            this._distributions[2] = new Array<number>(0.8742689, 0.0009265686, -0.6864116, -0.5536607, -0.2325206, 0.7678371);
            this._distributions[3] = new Array<number>(0.3913446, -0.7084417, -0.7511101, -0.5935929, -0.2323436, 0.5320091, 0.8435315, 0.5035911 );
            this._distributions[4] = new Array<number>(0.2122471, -0.5771395, -0.8543506, -0.1763534, 0.5189021, 0.8323698, -0.3616908, 0.5865368, 0.9523004, -0.04948437);
            this._distributions[5] = new Array<number>(0.5791035, 0.3496495, 0.2959551, -0.6006749, -0.2419119, -0.06879545, -0.7403072, 0.6110353, -0.04555973, 0.8059174, -0.5275017, -0.737129);
            this._distributions[6] = new Array<number>(0.06941478, 0.8519508, -0.7441907, 0.2426432, 0.6439992, -0.2405252, -0.1007523, -0.2327587, -0.6427067, -0.7248485, 0.8050759, 0.5492936, 0.3573822, -0.8824506);
            this._distributions[7] = new Array<number>(0.8509863, 0.4452587, -0.09507271, 0.2073005, 0.1706571, -0.6434793, 0.8029777, -0.2718274, -0.4401725, 0.8196304, 0.2715359, 0.8598521, -0.8121575, -0.006447683, -0.6486837, -0.7237598);
            this._distributions[8] = new Array<number>(0.6951686, -0.2680728, -0.04933243, 0.3710589, 0.6592212, 0.3661054, -0.01579228, -0.6909603, -0.3275101, -0.1756866, 0.3811549, 0.9218544, -0.216032, 0.9755028, -0.7065172, 0.3355389, -0.6579109, -0.6798355);
            this._distributions[9] = new Array<number>(0.6181276, -0.09790418, -0.2537868, -0.5570995, -0.1964931, 0.3459414, 0.3474613, -0.8885581, 0.5135743, 0.5753114, -0.9549091, 0.1480672, -0.8711916, -0.4293123, -0.6928071, 0.6190156, -0.13369, 0.8892705, 0.0548224, -0.1246777);
            this._distributions[10] = new Array<number>(0.4853027, -0.5080479, -0.1331675, -0.506597, 0.139575, 0.01316885, 0.803486, -0.07568797, 0.5240274, 0.4883182, -0.4334005, 0.1207938, -0.7794577, -0.3985141, 0.1576432, -0.9861221, -0.3712867, 0.6959021, 0.1517378, 0.9847429, -0.9762396, 0.1661073);
            this._distributions[11] = new Array<number>(-0.2790166, -0.01252619, 0.3389016, 0.3921154, 0.2408341, -0.313211, -0.8151779, -0.3898362, -0.6347761, 0.3486495, 0.09471484, -0.7722448, -0.1385674, 0.6364574, 0.2456331, 0.9295807, -0.3864306, -0.8247881, 0.6111673, -0.7164014, 0.8287669, 0.05466961, 0.837706, 0.5415626);
            this._distributions[12] = new Array<number>(0.056417, 0.3185693, -0.8245888, 0.1882799, 0.8575996, 0.1136829, 0.1070375, 0.875332, 0.4076743, -0.06000621, -0.4311306, 0.7239349, 0.2677574, -0.538472, -0.08486642, -0.2083647, -0.888989, -0.3906443, -0.4768958, -0.6664082, 0.09334993, -0.9861541, 0.808736, -0.455949, 0.5889823, 0.7660807);
            this._distributions[13] = new Array<number>(-0.2681346, -0.3955857, -0.1315102, -0.8852947, -0.5143692, 0.09551838, 0.4344836, -0.546945, -0.8620899, -0.3813288, 0.1650431, 0.02034803, -0.1543657, 0.3842218, -0.828457, 0.5376903, -0.6145, -0.7818927, -0.2639062, 0.8784655, 0.1912684, 0.9720125, 0.3135219, 0.5224229, 0.7850655, 0.4592297, 0.7465045, -0.1368916);
            this._distributions[14] = new Array<number>(0.4241029, 0.695281, 0.150511, -0.02304107, -0.2482675, 0.9120338, 0.8057325, 0.2622084, -0.2445909, 0.2765962, 0.8588713, -0.1772072, 0.3117845, -0.4385471, -0.3923851, -0.3298936, -0.1751254, -0.7405846, 0.6926506, -0.684163, -0.9304563, -0.3254691, -0.8533293, 0.1523024, 0.2510415, -0.917345, -0.6239773, -0.7105472, -0.6104624, 0.6041355);
            this._distributions[15] = new Array<number>(0.5844554, 0.06651045, 0.1343258, 0.6756578, 0.3799674, -0.6301104, 0.5590436, 0.7940555, 0.09574714, 0.02262517, 0.8697868, 0.393301, 0.003945862, -0.421735, 0.9043913, -0.2432393, -0.4844007, 0.7190998, -0.3201078, 0.2972371, -0.3852352, -0.6341155, -0.5413069, -0.09223081, -0.8468984, -0.5126905, 0.004156174, -0.8633173, -0.9681889, -0.03305046, -0.846509, 0.4414353);
            this._distributions[16] = new Array<number>(0.4506488, 0.657668, 0.4621297, 0.07441051, -0.2782125, 0.6201044, 0.9750003, 0.09110117, 0.1019436, 0.2986514, 0.03457398, 0.9631706, 0.542098, -0.5505635, 0.8675668, 0.4938077, -0.5414361, 0.2655292, -0.7941836, 0.6003053, -0.09847672, -0.1001604, -0.9316511, -0.08572888, 0.07286467, -0.611899, -0.5232627, -0.4082253, -0.5481608, -0.827938, -0.1551939, -0.9621193, 0.9220031, -0.3315949);
            this._distributions[17] = new Array<number>(0.197908, -0.4697656, -0.4474689, -0.3428435, 0.8529873, -0.2228634, 0.6022478, -0.5469642, 0.2545276, -0.931133, -0.1507547, -0.7855865, -0.07606658, 0.1011628, 0.3046715, 0.2785755, 0.4698432, -0.1064076, 0.6831254, 0.4152522, 0.1374381, 0.8363233, -0.2166121, 0.6682042, 0.5511393, 0.7996449, -0.4278994, 0.28836, -0.8875198, 0.2181732, -0.8772842, -0.2818254, -0.7000262, 0.5762185, -0.6062385, -0.7439126);
            this._distributions[18] = new Array<number>(0.6645703, -0.05678739, 0.5720971, 0.4533803, -0.07660709, 0.08802763, 0.5163431, -0.4426552, 0.1163455, -0.3404382, -0.4004807, -0.5046007, 0.2932099, -0.8201418, -0.5322125, 0.03834766, -0.1490209, -0.8817304, -0.8000439, -0.3509448, 0.5260983, 0.8421043, 0.1197811, 0.6963812, 0.9498612, 0.3122156, -0.9285746, 0.02120355, -0.6670724, 0.7217396, 0.9155889, -0.3510147, -0.271941, 0.4727852, 0.318879, 0.1634057, -0.2686755, 0.9253026);
            this._distributions[19] = new Array<number>(0.5064292, 0.422527, 0.8935515, -0.06610427, 0.1199719, 0.175568, 0.403388, -0.2003276, 0.1657927, 0.8154403, 0.9301245, 0.2929218, -0.1644068, 0.6201534, 0.7113559, -0.6589743, -0.3364046, -0.1799502, 0.02109996, -0.392765, -0.382213, 0.3219992, -0.9201946, 0.1207967, -0.726185, 0.4291916, -0.7443482, -0.2480059, -0.5147594, 0.7418784, 0.1935272, -0.7406143, -0.3643523, -0.5559214, -0.7147766, -0.6326278, -0.2524151, -0.9096627, 0.5161405, 0.7908453);
            this._distributions[20] = new Array<number>(0.7921003, -0.3032096, 0.5992879, -0.009052323, 0.2538549, -0.1872749, 0.7053444, 0.3677175, 0.5417761, -0.8170255, 0.9749611, 0.1210478, 0.1969143, -0.6117041, -0.1824499, -0.4634196, -0.1181338, -0.8668742, -0.3050112, -0.1352596, -0.4409327, -0.7082354, -0.03225285, 0.1171548, 0.3113096, 0.3250439, -0.8166144, -0.463995, -0.01014475, 0.4715334, -0.6868284, 0.05091889, -0.4011163, 0.2717285, -0.06756835, 0.8307694, -0.7938535, 0.4352129, -0.4663842, 0.7165329, 0.559729, 0.8093995);
            this._distributions[21] = new Array<number>(0.07832243, 0.426151, -0.3856795, 0.5799953, 0.01970797, 0.06706189, 0.4822682, 0.3014512, -0.1532982, 0.87485, -0.4959527, 0.07888043, 0.260601, -0.2304784, 0.4996209, 0.7167382, 0.585986, -0.04265174, -0.7679967, 0.5509416, -0.9041753, 0.1802134, -0.8407655, -0.4442826, -0.2058258, -0.2636995, -0.4984115, -0.5928579, 0.2926032, -0.7886473, -0.06933882, -0.621177, 0.578115, -0.4813387, 0.8981777, -0.3291056, 0.1942733, 0.9255584, 0.8084362, 0.5066984, 0.9920095, 0.03103104, -0.2403206, -0.9389018);
            this._distributions[22] = new Array<number>(-0.5691095, 0.1014316, -0.7788262, 0.384012, -0.8253665, -0.1645582, -0.1830993, 0.002997211, -0.2555013, -0.4177977, -0.6640869, -0.4794711, -0.2351242, 0.5850121, 0.02436554, 0.2825883, 0.006061143, -0.8200245, 0.1618791, -0.3063331, -0.3765897, -0.7249815, 0.6092919, -0.6769328, -0.5956934, 0.6957655, 0.5383642, 0.4522677, -0.1489165, 0.9125596, 0.4167473, 0.1335986, 0.1898309, 0.5874342, 0.2288171, 0.9624356, 0.7540846, -0.07672304, 0.8986252, 0.2788797, 0.3555991, -0.9262139, 0.8454325, -0.4027667, 0.4945236, -0.2935512);
            this._distributions[23] = new Array<number>(-0.4481403, -0.3758374, -0.8877251, 0.08739938, 0.05015831, -0.1339983, -0.4070427, -0.8534173, 0.1019274, -0.5503222, -0.445998, 0.1997541, -0.8686263, -0.2788867, -0.7695944, -0.6033704, -0.05515742, -0.885711, -0.7714347, 0.5790485, 0.3466263, -0.8799297, 0.4487582, -0.5321087, -0.2461368, 0.6053771, -0.05568117, 0.2457351, -0.4668669, 0.8523816, 0.8103387, -0.4255538, 0.4054182, -0.175663, -0.2802011, -0.08920153, 0.2665959, 0.382935, 0.555679, 0.1621837, 0.105246, 0.8420411, 0.6921161, 0.6902903, 0.880946, 0.2483067, 0.9699264, -0.1021767);
            this._distributions[24] = new Array<number>(-0.1703323, -0.3119385, 0.2916039, -0.2988263, -0.008472982, -0.9277695, -0.7730271, -0.3277904, 0.3440474, -0.6815342, -0.2910278, 0.03461745, -0.6764899, -0.657078, -0.3505501, -0.7311988, -0.03478927, 0.3258755, -0.6048835, 0.159423, 0.2035525, 0.02212214, 0.5116573, 0.2226856, 0.6664805, -0.2500189, 0.7147882, -0.6609634, 0.03030632, -0.5763278, -0.2516585, 0.6116219, -0.9434413, -0.0116792, 0.9061816, 0.2491155, 0.182867, 0.6076167, 0.286593, 0.9485695, -0.5992439, 0.6970096, -0.2082874, 0.9416641, 0.9880044, -0.1541709, -0.9122881, 0.331555, 0.7324886, 0.6725098);
            this._distributions[25] = new Array<number>(0.3869598, -0.04974834, 0.7168844, -0.0693711, -0.07166742, 0.1725325, 0.4599592, 0.3232779, 0.5872094, -0.4198674, 0.2442266, -0.625667, 0.1254557, 0.4500048, -0.2290154, -0.1803567, 0.890583, 0.3373493, 0.1256081, 0.7853789, -0.2676466, 0.5305805, -0.7063224, 0.252168, -0.3989835, 0.1189921, 0.09617215, -0.2451447, 0.6302541, 0.6085876, 0.9380925, -0.3234899, 0.5086241, -0.8573482, 0.03576187, -0.9876697, -0.0876712, -0.6365195, -0.5276513, 0.823456, -0.6935764, -0.2240411, -0.5212318, -0.5383121, -0.2116208, 0.9639363, -0.9840096, 0.02743555, -0.3991577, -0.8994547, -0.7830126, 0.614068);
            this._distributions[26] = new Array<number>(-0.8366601, 0.4464895, -0.5917366, -0.02073906, -0.9845258, 0.1635625, -0.3097973, 0.4379579, -0.5478154, 0.7173221, -0.1685888, 0.9261969, 0.01503595, 0.6046097, 0.4452421, 0.5449086, 0.0315687, 0.1944619, 0.3753404, 0.8688548, 0.4143643, 0.1396648, 0.8711032, 0.4304703, 0.7328773, 0.1461501, 0.6374492, -0.3521495, 0.145613, -0.1341466, 0.9040975, -0.135123, -0.7839059, -0.5450199, -0.516019, -0.3320859, -0.206158, -0.4431106, -0.9703014, -0.2368356, -0.2473119, -0.0864351, 0.2130725, -0.4604077, -0.003726701, -0.7122303, -0.4072131, -0.6833169, 0.1632999, -0.9776646, 0.4686888, -0.680495, -0.2293511, -0.9509777);
            this._distributions[27] = new Array<number>(0.107311, -0.1311369, -0.4194764, -0.3148777, 0.6171439, -0.2745973, 0.2796618, 0.1937153, -0.09106886, 0.4180236, 0.6044006, 0.05577846, 0.02927299, -0.6738263, -0.2580845, 0.1179939, -0.09023564, -0.3830024, 0.3570953, -0.5000587, 0.81591, -0.5518309, 0.9300217, -0.1257987, 0.4904627, -0.8381903, -0.3163182, -0.8632009, 0.1137595, -0.9875998, 0.8390043, 0.3538185, 0.2149114, 0.4993694, 0.5191584, 0.3833552, 0.5002763, 0.7061465, -0.2567276, 0.9068756, -0.5197366, 0.3467845, 0.03668867, 0.9734009, -0.5347553, 0.66747, -0.9028882, 0.1023768, -0.8967977, 0.412834, -0.5821944, 0.0426479, -0.8032165, -0.2397038, -0.5597343, -0.6358021);
            this._distributions[28] = new Array<number>(-0.6562496, -0.1781036, -0.9301494, 0.1185208, -0.3861143, -0.4153562, -0.1560799, -0.1099607, -0.5587025, 0.395218, -0.5322112, -0.699701, -0.5008639, 0.08726846, -0.970524, -0.1963461, -0.813577, -0.5185111, -0.1644458, 0.298, -0.3216791, 0.639982, 0.3315373, 0.3339162, 0.2383235, -0.00105722, 0.1137828, 0.5450742, -0.01899921, 0.8798413, 0.2849685, 0.8255596, 0.6974412, 0.2123175, 0.7588523, 0.5470437, 0.5102502, -0.1687844, 0.5853448, 0.8033476, 0.2590716, -0.5262504, 0.5607718, -0.6342825, 0.8666443, -0.1491841, 0.8341052, -0.4935003, -0.1568441, -0.6634066, 0.2512113, -0.8769391, -0.2559827, -0.9572457, -0.01928852, -0.3966542, -0.750667, 0.6409678);
            this._distributions[29] = new Array<number>(0.3454786, -0.04837726, 0.2649553, 0.2406852, 0.5599093, -0.3839145, -0.1111814, -0.05502108, 0.7586042, -0.05818377, 0.2519488, -0.4665135, -0.1264972, 0.2602723, -0.08766216, -0.3671907, 0.6428129, 0.3999204, -0.6105871, -0.1246869, -0.4589451, -0.7646643, -0.03021116, -0.7899352, -0.6036922, -0.4293956, -0.2481938, 0.6534185, 0.102798, 0.6784465, -0.6392644, 0.4821358, -0.6789002, 0.1779133, -0.9140783, -0.1989647, -0.9262617, 0.3381507, 0.4794891, -0.8093274, 0.3959447, 0.668478, 0.9602883, 0.2272305, -0.123672, 0.9210883, 0.2375148, 0.9523395, -0.52898, 0.7973378, -0.382433, 0.1228794, 0.695015, 0.6948439, 0.7530277, -0.6458191, 0.8777987, -0.3272956, 0.2318525, -0.962768);
            this._distributions[30] = new Array<number>(0.4518921, -0.1146195, 0.4720805, -0.4238748, 0.3655423, 0.1806341, 0.1589939, -0.23568, 0.7673324, -0.5149941, 0.01163658, 0.09045836, 0.7010971, 0.1245747, 0.7518286, -0.1855433, 0.4960719, 0.4601022, 0.2566979, -0.6308268, -0.0654714, -0.5126389, -0.1823319, -0.1343282, -0.1464312, 0.4883236, -0.3858738, 0.203523, 0.1484799, 0.4432284, -0.477109, -0.116241, 0.2719092, 0.7208626, 0.9104174, 0.3578536, -0.5956199, 0.7662588, -0.6996251, 0.3678654, -0.2514512, 0.9251933, 0.1275825, -0.9478135, -0.204608, -0.8611552, 0.4264838, -0.877443, 0.9854161, 0.05521112, 0.5912951, 0.7997434, 0.1140349, 0.982093, -0.9324368, -0.2094094, -0.42436, -0.6441524, -0.6722705, -0.3554261, -0.7844236, 0.08587621);
            this._distributions[31] = new Array<number>(-0.4206714, -0.5613642, -0.8733016, -0.3373051, -0.1046226, -0.2902999, -0.1318562, -0.8434365, 0.1145093, -0.5962623, -0.4965627, -0.1873259, -0.5011808, -0.8546229, -0.7165636, -0.5743566, 0.1090901, 0.2017643, 0.3404809, -0.220455, -0.1989015, 0.2372122, -0.4538706, 0.0979171, 0.4514146, -0.572846, 0.2314168, -0.8514503, -0.4247236, 0.5650803, -0.943347, 0.04514639, -0.1309718, 0.5221877, -0.7004157, 0.4561877, 0.6306441, 0.04448673, 0.4301621, 0.5766876, 0.1078042, 0.7245752, 0.3875354, 0.2794483, 0.702876, -0.2924213, 0.7360667, -0.6210318, 0.7486517, 0.6531103, 0.4898235, 0.8591025, 0.6549174, 0.3854057, -0.2596106, 0.7916998, 0.9251194, -0.05296265, -0.5620695, 0.820877, -0.01228026, 0.9937211, 0.9612103, 0.2628758);
        }

        public static getDistribution(n:number /*int*/):Array<number>
        {
            if (!this._distributions)
                this.initDistributions();

            if (n < 2 || n > 32)
                return null;

            return this._distributions[n - 1];
        }
    }
}
