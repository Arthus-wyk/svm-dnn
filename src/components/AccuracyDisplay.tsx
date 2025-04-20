import React from 'react';
import { Progress, Typography, Card } from 'antd';

const { Text, Title } = Typography;

const AccuracyDisplay = ({title,accuracy}:{title:string, accuracy:any }) => {
  // 将准确率转换为百分比
  const accuracyPercentage = (accuracy * 100).toFixed(2);

  return (
    <div style={{display:'flex'}}>
      {/* 标题 */}
      <Title level={5} style={{padding:'10px',marginRight:'10px'}}>{title}：</Title>

      {/* 显示准确率百分比 */}
      <Text style={{ fontSize: '20px', fontWeight: 'bold' }}>{accuracyPercentage}%</Text>

      {/* 进度条 */}
      <div style={{ marginTop: '10px' }}>
        <Progress
          type="circle"
          percent={parseFloat(accuracyPercentage)}
          status={accuracy >= 0.8 ? 'success' : accuracy >= 0.5 ? 'normal' : 'exception'}
          strokeColor={
            accuracy >= 0.8
              ? '#52c41a' // 绿色
              : accuracy >= 0.5
              ? '#faad14' // 橙色
              : '#f5222d' // 红色
          }
          width={80} // 调整进度条大小
        />
      </div>
    </div>
  );
};

export default AccuracyDisplay;
