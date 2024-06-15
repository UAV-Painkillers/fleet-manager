import { useMemo } from "react";

export enum DroneColor {
  Black = "black",
  White = "white",
}

interface Props {
  color?: DroneColor;
}

export function DroneIcon(props: Omit<React.SVGProps<SVGSVGElement>, 'color'> & Props) {
  const { color = DroneColor.Black, ...svgProps } = props;

  const colorCode = useMemo(() => {
    if (color === DroneColor.Black) {
      return "#000";
    }

    return "#FEFEFE";
  }, [color]);

  return (
    <svg
      {...svgProps}
      xmlns="http://www.w3.org/2000/svg"
      width="765"
      height="807"
      viewBox="0 0 765 807"
    >
      <path
        fill={colorCode}
        transform="matrix(0.423588 0 0 0.423622 3.05176e-05 -0.000244141)"
        d="M0 796.611C1.35468 784.81 2.10159 773.09 4.49704 761.415C13.2517 718.743 36.8883 680.5 70.8866 653.317C109.876 622.143 160.376 607.579 209.96 613.427C259.346 619.252 304.787 644.542 335.554 683.647C346.5 697.559 355.478 713.024 362.056 729.462C348.358 735.014 334.714 740.858 320.898 746.099C305.198 709.605 278.076 681.39 240.89 666.585C205.856 652.636 166.124 653.273 131.519 668.205C96.5595 683.29 68.6675 712.033 54.7881 747.507C40.8969 783.01 41.6955 822.826 57.1728 857.679C72.6728 892.583 101.624 920.093 137.34 933.635C173.716 947.428 213.197 945.836 248.429 929.578C264.379 922.218 277.997 912.198 290.475 899.904C301.016 910.274 311.419 920.847 322.193 930.969C286.109 966.909 238.782 987.625 187.586 987.369C137.478 987.118 89.4315 966.997 54.3211 931.22C28.6275 905.038 10.7504 871.356 3.92886 835.269C1.91367 824.609 1.52043 813.918 0 803.237L0 796.611Z"
      />
      <path
        fill={colorCode}
        transform="matrix(0.423588 0 0 0.423622 3.05176e-05 -0.000244141)"
        d="M1034.43 0L1056.1 0C1061.75 1.27515 1067.96 1.53248 1073.72 2.43111C1087.52 4.5848 1101.04 8.04166 1114.06 13.1316C1160.5 31.2818 1198.17 67.878 1217.85 113.683C1237.57 159.579 1238.16 211.881 1219.47 258.211C1200.11 306.234 1163.08 341.654 1115.8 361.825L1099.17 320.718C1115.12 314.162 1130 304.806 1142.66 293.092C1169.74 268.053 1187.3 231.494 1188.72 194.465C1190.2 155.924 1176.37 118.142 1150 89.9236C1123.85 61.9471 1087.28 45.5588 1049.01 44.5647C1011.1 43.5801 973.966 58.2159 946.556 84.3361C919.047 110.55 903.113 147.143 902.275 185.109C901.382 225.549 917.607 261.455 945.328 290.274L913.961 321.898C886.413 292.93 867.47 259.657 860.587 219.923C852.039 170.575 863.846 119.633 892.783 78.8434C918.296 42.8796 956.556 16.8731 999.277 6.07718C1010.93 3.1315 1022.64 2.03723 1034.43 0Z"
      />
      <path
        fill={colorCode}
        transform="matrix(0.423588 0 0 0.423622 3.05176e-05 -0.000244141)"
        d="M1605.79 896.148C1630.2 892.566 1660.74 899.215 1683.56 907.726C1730.58 925.26 1768.62 961.184 1789.09 1006.99C1809.56 1052.81 1810.49 1105.58 1792.21 1152.27C1774.07 1198.61 1737.51 1236.04 1691.89 1255.78C1646.43 1275.44 1593.96 1275.95 1547.97 1257.65C1499.43 1238.33 1464.12 1201.11 1443.55 1153.59L1484.78 1137.09C1488.27 1144.84 1492.05 1152.23 1496.31 1159.59C1500.6 1166.1 1505.12 1172.35 1510.28 1178.21C1535.78 1207.19 1572.23 1224.41 1610.68 1226.54C1648.38 1228.63 1686.21 1214.64 1714.06 1189.29C1742.36 1163.54 1759.07 1127.46 1760.71 1089.24C1762.34 1051.13 1748.47 1013.88 1722.61 985.875C1697 958.138 1660.53 941.535 1622.81 940.251C1581.02 938.828 1545.34 954.745 1515.26 983.05L1483.57 951.992C1517.32 918.677 1558.48 899.735 1605.79 896.148Z"
      />
      <path
        fill={colorCode}
        transform="matrix(0.423588 0 0 0.423622 3.05176e-05 -0.000244141)"
        d="M731.087 1903.77C724.389 1904.72 716.732 1903.26 710.114 1902.05C681.046 1896.74 653.371 1885.06 629.713 1867.3C589.794 1837.34 562.958 1791.91 556.214 1742.42C549.456 1692.83 562.987 1641.95 593.533 1602.28C613.601 1576.23 641.148 1555.11 671.825 1543.1C677.389 1556.76 683.122 1570.39 688.432 1584.15C651.342 1601 622.927 1627.45 608.246 1666.11C594.836 1701.43 595.946 1741.13 611.442 1775.59C627.017 1810.22 656.104 1837.79 691.699 1851.11C727.457 1864.49 767.151 1863.13 801.85 1847.17C836.393 1831.29 863.56 1802 876.593 1766.27C889.68 1730.39 888.019 1690.28 871.613 1655.76C864.208 1640.18 854.203 1627.05 842.334 1614.62C852.666 1604.16 863.479 1593.9 873.311 1582.98C909.011 1618.28 929.479 1665.46 929.773 1715.82C930.064 1765.82 910.235 1814.24 874.855 1849.56C846.353 1878.01 797.103 1904.11 756.051 1904.17C755.023 1904.17 754.166 1904 753.164 1903.79C752.89 1903.93 752.627 1904.09 752.341 1904.19C747.36 1906.08 735.964 1905.75 731.087 1903.77Z"
      />
      <path
        fill={colorCode}
        transform="matrix(0.423588 0 0 0.423622 3.05176e-05 -0.000244141)"
        d="M1038.57 120.248C1051.83 118.658 1065.37 120.885 1077.03 127.514C1091.07 135.489 1101.22 148.972 1105.38 164.531C1109.52 180.07 1107.25 196.846 1099.12 210.728C1089.69 226.81 1075.44 235.055 1057.84 239.689C1047.49 295.84 1035.62 351.819 1024.51 407.832C1013.32 464.246 1002.84 520.897 990.761 577.12L992.175 576.115C1012.09 562.253 1032.63 547.675 1054.19 536.503C1103.78 510.8 1161.28 502.762 1216.07 513.356C1280.92 525.897 1338.42 563.824 1375.42 618.617C1412.63 673.734 1426.1 741.78 1413.1 806.915C1401.79 863.573 1371.37 914.685 1326.62 951.204C1308.37 966.101 1287.8 978.585 1268.19 991.616C1302.95 997.054 1337.76 1005.22 1372.29 1012.07L1572.05 1051.67C1580.22 1039.68 1591.14 1030.46 1605.07 1025.94C1620.62 1020.9 1636.98 1022.26 1651.41 1029.88C1665.91 1037.54 1676.89 1050.07 1681.53 1065.91C1686.09 1081.45 1684.34 1098.74 1676.46 1112.91C1668.64 1127 1655.1 1137.4 1639.57 1141.58C1624.03 1145.77 1607.15 1143.62 1593.22 1135.56C1577.54 1126.48 1568.88 1112.48 1564.35 1095.32C1525.59 1089.24 1486.73 1080.03 1448.21 1072.39L1216.49 1026.39L853.649 1269.03L802.826 1525.04C793.492 1572.07 783.484 1619.08 775.017 1666.28C782.431 1671.39 788.732 1677.66 793.499 1685.33C802.001 1699.01 804.617 1715.71 800.815 1731.35C796.634 1748.55 785.981 1761.02 771.097 1770.08C766.444 1772.46 761.713 1774.39 756.639 1775.66C741.263 1779.53 724.895 1777.26 711.274 1769.07C697.359 1760.72 687.325 1746.95 683.457 1731.2C679.615 1715.56 682.382 1698.57 690.876 1684.9C700.146 1669.99 714.357 1661.57 731.161 1657.66C739.89 1617.9 747.12 1577.67 755.05 1537.72L801.397 1304.19C782.446 1316.85 763.624 1330.51 743.629 1341.45C692.801 1369.27 633.917 1378.43 577.04 1367.47C511.66 1354.87 453.905 1316.93 416.801 1261.52C379.466 1205.77 366.272 1137.86 379.586 1072.19C391.083 1015.49 422.182 964.51 467.15 928.207C484.972 913.819 504.876 901.673 523.955 889.026L239.057 832.57C230.448 844.118 220.412 852.84 206.5 857.286C191.053 862.223 174.295 860.643 159.945 853.15C145.766 845.746 134.967 832.709 130.254 817.43C125.377 801.622 127.531 784.601 135.443 770.162C142.797 756.741 155.686 746.365 170.364 742.088C186.358 737.429 203.395 738.909 217.964 747.203C234.736 756.751 242.762 770.972 247.834 789.055L576.07 854.11L938.802 611.638C962.446 484.486 991.112 358.182 1014.15 230.922C1000.52 221.127 990.898 207.987 987.726 191.31C984.722 175.51 988.237 158.863 997.362 145.625C1007.29 131.226 1021.66 123.427 1038.57 120.248Z"
      />
      <path
        fill="#252551"
        transform="matrix(0.423588 0 0 0.423622 3.05176e-05 -0.000244141)"
        d="M1159.8 553.046C1175.17 551.513 1192.51 553.6 1207.55 556.516C1261.03 566.885 1308.79 598.323 1339.06 643.677C1369.51 689.283 1380.72 744.473 1369.95 798.271C1362.54 835.313 1345.35 869.459 1319.74 897.254C1300.6 918.039 1277.04 932.689 1253.76 948.25L1196.07 986.783L1016.92 1106.67C1019.87 1098.6 1022.79 1090.6 1025.06 1082.29C1031.18 1062.66 1033.92 1041.28 1034.55 1020.74C1036.55 954.903 1011.14 890.683 966.059 842.9C919.447 793.492 855.88 767.195 788.395 765.292C808.135 751.171 828.855 738.106 849.037 724.607L966.851 645.907L1029.27 604.105C1045.88 592.977 1062.3 581.121 1080.41 572.529C1105.53 560.618 1132.08 554.335 1159.8 553.046Z"
      />
      <path
        fill="#4FBAA6"
        transform="matrix(0.423588 0 0 0.423622 3.05176e-05 -0.000244141)"
        d="M777.082 809.647C777.399 809.623 777.716 809.595 778.033 809.574C828.726 806.222 882.91 827.144 920.643 860.43C961.317 896.31 986.675 947.63 990.013 1001.8C993.328 1055.58 974.418 1110.68 938.414 1150.81C917.429 1174.19 891.326 1190.71 865.448 1208.01L804.882 1248.49C776.049 1267.81 739.172 1295.74 708.211 1309.79C684.805 1320.41 660.103 1326.19 634.472 1327.57C582.692 1331.38 528.415 1311.46 489.461 1277.7C447.767 1241.56 422.471 1189.98 418.925 1134.97C415.456 1081.19 434.247 1026.31 470.131 986.098C478.239 977.012 487.172 968.627 496.771 961.134C508.8 951.742 521.833 943.539 534.517 935.064L592.814 896.155L645.912 860.62C664.491 848.206 683.031 835.407 703.579 826.407C727.055 816.125 751.601 811.09 777.082 809.647Z"
      />
    </svg>
  );
}

export function DroneWhiteIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <DroneIcon {...props} color={DroneColor.White}  />
  );
}

export function DroneBlackIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <DroneIcon {...props} color={DroneColor.Black} />
  );
}